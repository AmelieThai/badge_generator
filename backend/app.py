import os
import json
import subprocess
import shutil
from datetime import datetime
from pathlib import Path
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
BASE_DIR = Path(__file__).parent
TEMPLATE_PATH = BASE_DIR / "badge_template.scad"
GENERATIONS_DIR = BASE_DIR / "generations"
OPENSCAD_PATH = os.environ.get('OPENSCAD_PATH', 'openscad')
MAX_FILE_SIZE = int(os.environ.get('MAX_FILE_SIZE', 5 * 1024 * 1024))  # 5MB default

# Create generations directory if it doesn't exist
GENERATIONS_DIR.mkdir(exist_ok=True)

def validate_e_badge(value):
    """Validate e_badge parameter"""
    try:
        e_badge = float(value)
        if not (0.5 <= e_badge <= 2.0):
            return None, "e_badge must be between 0.5 and 2.0"
        return e_badge, None
    except (ValueError, TypeError):
        return None, "e_badge must be a valid number"

def validate_svg_file(file):
    """Validate uploaded SVG file"""
    if not file:
        return None, "No file provided"
    
    if not file.filename:
        return None, "No filename provided"
    
    if not file.filename.lower().endswith('.svg'):
        return None, "File must be an SVG"
    
    # Check file size using content_length
    if file.content_length and file.content_length > MAX_FILE_SIZE:
        return None, f"File size exceeds maximum of {MAX_FILE_SIZE / (1024*1024)}MB"
    
    return True, None

def check_openscad_available():
    """Check if OpenSCAD CLI is available"""
    try:
        result = subprocess.run(
            [OPENSCAD_PATH, '--version'],
            capture_output=True,
            text=True,
            timeout=5
        )
        return result.returncode == 0
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return False

def generate_scad_file(template_path, svg_path, e_badge, output_path):
    """Generate .scad file from template with parameters"""
    with open(template_path, 'r') as f:
        template_content = f.read()
    
    # Replace placeholders
    scad_content = template_content.replace('{{E_BADGE}}', str(e_badge))
    scad_content = scad_content.replace('{{SVG_PATH}}', str(svg_path))
    
    with open(output_path, 'w') as f:
        f.write(scad_content)

def generate_3mf(scad_path, output_path):
    """Convert .scad file to .3mf using OpenSCAD CLI"""
    try:
        result = subprocess.run(
            [OPENSCAD_PATH, '-o', str(output_path), str(scad_path)],
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode != 0:
            error_msg = result.stderr or result.stdout or "Unknown error"
            return False, f"OpenSCAD error: {error_msg}"
        
        if not output_path.exists():
            return False, "3MF file was not generated"
        
        return True, None
    except subprocess.TimeoutExpired:
        return False, "OpenSCAD generation timed out"
    except Exception as e:
        return False, f"Error running OpenSCAD: {str(e)}"

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    openscad_available = check_openscad_available()
    
    return jsonify({
        'status': 'healthy' if openscad_available else 'degraded',
        'openscad_available': openscad_available,
        'openscad_path': OPENSCAD_PATH
    }), 200 if openscad_available else 503

@app.route('/api/generate', methods=['POST'])
def generate_badge():
    """Generate badge 3MF file"""
    # Validate e_badge parameter
    e_badge_value = request.form.get('e_badge')
    if not e_badge_value:
        return jsonify({'error': 'e_badge parameter is required'}), 400
    
    e_badge, error = validate_e_badge(e_badge_value)
    if error:
        return jsonify({'error': error}), 400
    
    # Validate SVG file
    if 'svg_file' not in request.files:
        return jsonify({'error': 'svg_file is required'}), 400
    
    svg_file = request.files['svg_file']
    valid, error = validate_svg_file(svg_file)
    if error:
        return jsonify({'error': error}), 400
    
    # Check OpenSCAD availability
    if not check_openscad_available():
        return jsonify({
            'error': 'OpenSCAD is not available',
            'details': f'Please install OpenSCAD and ensure it is accessible at: {OPENSCAD_PATH}'
        }), 503
    
    # Generate timestamp for this generation
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Create paths
    svg_path = GENERATIONS_DIR / f"{timestamp}_input.svg"
    scad_path = GENERATIONS_DIR / f"{timestamp}_badge.scad"
    output_3mf_path = GENERATIONS_DIR / f"{timestamp}_output.3mf"
    params_path = GENERATIONS_DIR / f"{timestamp}_params.json"
    
    try:
        # Save SVG file
        svg_file.save(svg_path)
        
        # Save parameters
        params = {
            'timestamp': timestamp,
            'e_badge': e_badge,
            'svg_filename': secure_filename(svg_file.filename),
            'svg_size_bytes': svg_path.stat().st_size
        }
        with open(params_path, 'w') as f:
            json.dump(params, f, indent=2)
        
        # Generate .scad file
        generate_scad_file(TEMPLATE_PATH, svg_path, e_badge, scad_path)
        
        # Generate .3mf file
        success, error = generate_3mf(scad_path, output_3mf_path)
        if not success:
            return jsonify({'error': error}), 500
        
        # Send the file
        return send_file(
            output_3mf_path,
            mimetype='application/3mf',
            as_attachment=True,
            download_name=f'badge_{timestamp}.3mf'
        )
    
    except Exception as e:
        # Clean up on error
        for path in [svg_path, scad_path, output_3mf_path, params_path]:
            if path.exists():
                path.unlink()
        
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Badge Generator Backend on port {port}")
    print(f"OpenSCAD path: {OPENSCAD_PATH}")
    print(f"Generations directory: {GENERATIONS_DIR}")
    
    # Check OpenSCAD on startup
    if check_openscad_available():
        print("✓ OpenSCAD is available")
    else:
        print("✗ WARNING: OpenSCAD is not available!")
        print("  Install OpenSCAD CLI to enable badge generation")
    
    app.run(host='0.0.0.0', port=port, debug=True)
