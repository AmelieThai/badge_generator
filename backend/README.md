# Badge Generator Backend

Backend Flask API for the badge generator application. This server handles file uploads, parameter validation, and 3MF file generation using OpenSCAD.

## Prerequisites

- Python 3.8 or higher
- OpenSCAD CLI installed and accessible in PATH

### Installing OpenSCAD CLI

**Linux (Debian/Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install openscad
```

**macOS:**
```bash
brew install openscad
```

**Windows:**
Download from [OpenSCAD.org](https://openscad.org/downloads.html) and add to PATH.

## Installation

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Configuration

### Environment Variables

- `OPENSCAD_PATH` - Path to OpenSCAD executable (default: `openscad`)
- `PORT` - Server port (default: `5000`)
- `MAX_FILE_SIZE` - Maximum SVG file size in bytes (default: `5242880` = 5MB)
- `GENERATIONS_DIR` - Directory for storing generations (default: `./generations/`)

### Example .env file:
```bash
OPENSCAD_PATH=/usr/bin/openscad
PORT=5000
MAX_FILE_SIZE=5242880
```

## Running the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /api/health

Check server and OpenSCAD availability.

**Response:**
```json
{
  "status": "healthy",
  "openscad_available": true,
  "openscad_path": "/usr/bin/openscad"
}
```

**Status Codes:**
- `200` - Server is healthy and OpenSCAD is available
- `503` - Server is running but OpenSCAD is not available

### POST /api/generate

Generate a 3MF badge file.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Parameters:
  - `e_badge` (form field): Float between 0.5 and 2.0 (badge thickness parameter)
  - `svg_file` (file): SVG file to embed in the badge

**Example with curl:**
```bash
curl -X POST http://localhost:5000/api/generate \
  -F "e_badge=0.76" \
  -F "svg_file=@my_logo.svg" \
  -o badge.3mf
```

**Example with Python:**
```python
import requests

with open('logo.svg', 'rb') as f:
    files = {'svg_file': f}
    data = {'e_badge': '0.76'}
    response = requests.post('http://localhost:5000/api/generate', 
                           files=files, data=data)
    
    with open('badge.3mf', 'wb') as output:
        output.write(response.content)
```

**Success Response:**
- Status: `200`
- Content-Type: `application/3mf`
- Body: Binary 3MF file

**Error Responses:**
```json
{
  "error": "Error description"
}
```

**Status Codes:**
- `400` - Invalid parameters or file
- `500` - Server error during generation
- `503` - OpenSCAD not available

### Error Messages

- `"e_badge parameter is required"` - Missing e_badge parameter
- `"e_badge must be between 0.5 and 2.0"` - Invalid e_badge value
- `"svg_file is required"` - Missing SVG file
- `"File must be an SVG"` - Invalid file type
- `"File size exceeds maximum of XMB"` - File too large
- `"OpenSCAD is not available"` - OpenSCAD CLI not found

## File Storage

Generated files are stored in the `generations/` directory:

```
generations/
├── 20231226_153045_params.json    # Generation parameters
├── 20231226_153045_input.svg      # Uploaded SVG
├── 20231226_153045_badge.scad     # Generated OpenSCAD file
└── 20231226_153045_output.3mf     # Final 3MF output
```

Each generation is timestamped with format: `YYYYMMDD_HHMMSS`

## Template System

The `badge_template.scad` file contains the OpenSCAD template with placeholders:
- `{{E_BADGE}}` - Replaced with the e_badge parameter value
- `{{SVG_PATH}}` - Replaced with the path to the uploaded SVG file

## Development

### Running in Debug Mode

The application runs in debug mode by default when started with `python app.py`.

### Testing the API

Test health endpoint:
```bash
curl http://localhost:5000/api/health
```

Test generation with a sample SVG:
```bash
# Create a simple test SVG
echo '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>' > test.svg

# Generate badge
curl -X POST http://localhost:5000/api/generate \
  -F "e_badge=0.76" \
  -F "svg_file=@test.svg" \
  -o test_badge.3mf
```

## Troubleshooting

### OpenSCAD not found
Ensure OpenSCAD is installed and in your PATH:
```bash
openscad --version
```

If not in PATH, set the `OPENSCAD_PATH` environment variable to the full path.

### Permission errors on generations folder
Ensure the backend has write permissions:
```bash
chmod 755 generations/
```

### CORS errors from frontend
The backend uses `flask-cors` to allow cross-origin requests. If you encounter CORS issues, ensure the frontend URL is correct.

## Production Deployment

For production, use a WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Or use uWSGI:
```bash
pip install uwsgi
uwsgi --http :5000 --wsgi-file app.py --callable app --processes 4
```
