$fn = 50;
hauteur = 96;
largeur = 59;
rayon = 6;
epaisseur = 1.5;
e_badge = {{E_BADGE}}; // PARAMÈTRE MODIFIABLE

largeur_trou = 15;
hauteur_trou = 4;

a = [0,0];
b = [0,14];
c = [12,14];
d = [12,0];
e = [11,0];
f = [11,13];
g = [1,13];
h = [1,0];

A = [1.2,0];
B = [3.11,0];
C = [3.11,e_badge + 0.74];
D = [2.11,e_badge + 1.74];
E = [0,e_badge + 1.74];
F = [0,e_badge + 0.955];
G = [1.2,e_badge - 0.475];

p_a = [0,0];
p_b = [0,2.8];
p_c = [e_badge + 0.74, 0];

color("red",1.0)
difference () {
    union () {
        translate([-hauteur/2 + rayon, -largeur/2, 0]) cube([hauteur - 2 * rayon, largeur, epaisseur]);
        translate([-hauteur/2, -largeur/2 + rayon, 0]) cube([hauteur, largeur - 2*rayon, epaisseur]);

        for( i = [-1 : 2 : 1]) {
            for(j = [-1 : 2: 1]) {
                translate([ i  * (hauteur/2 - rayon), j * (largeur/2 - rayon), 0])
                cylinder(h = epaisseur, r = rayon);
            }
        }
        rotate([90,0,90]) translate([largeur/2 - 3.11,epaisseur,-hauteur/2 + rayon]) linear_extrude(height = hauteur - 2 * rayon) polygon([A,B,C,D,E,F,G]);

        translate([hauteur/2 - rayon, largeur/2 - rayon,epaisseur]) rotate_extrude(angle = 90) translate([rayon - 3.11 ,0,0]) polygon([A,B,C,D,E,F,G]);

        rotate([90,0,0]) translate([hauteur/2-3.11,epaisseur,-largeur/2+rayon]) linear_extrude(height = largeur - 2 * rayon) polygon([A,B,C,D,E,F,G]);

        rotate([0,0,-90]) translate([largeur/2 - rayon, hauteur/2 - rayon,epaisseur]) rotate_extrude(angle = 90) translate([rayon - 3.11 ,0,0]) polygon([A,B,C,D,E,F,G]);

        rotate([90,0,-90]) translate([largeur/2 - 3.11,epaisseur,-hauteur/2 + rayon]) linear_extrude(height = hauteur - 2 * rayon) polygon([A,B,C,D,E,F,G]);

        rotate([90,-90,0]) translate([epaisseur,hauteur/2 - 4.89 - 2.8,12]) linear_extrude(height = 10) polygon([p_a, p_b, p_c]);
        rotate([90,-90,0]) translate([epaisseur,hauteur/2 - 4.89 - 2.8,-22]) linear_extrude(height = 10) polygon([p_a, p_b, p_c]);
    };
    translate([-hauteur/2 + 3.1,-(largeur_trou-hauteur_trou)/2,0]) cube([hauteur_trou,largeur_trou - hauteur_trou,epaisseur]);
    translate([-hauteur/2 + 3.1 + hauteur_trou/2 ,(largeur_trou - hauteur_trou)/2,0]) cylinder(h = epaisseur, r = hauteur_trou/2);
    translate([-hauteur/2 + 3.1 + hauteur_trou/2 ,-(largeur_trou - hauteur_trou)/2,0]) cylinder(h = epaisseur, r = hauteur_trou/2);
    rotate([0,0,90]) translate([11,30.11,0]) linear_extrude(height = epaisseur, v = [0,0,1]) polygon([a,b,c,d,e,f,g,h]);
    rotate([0,0,90]) translate([-12 - 11,30.11,0]) linear_extrude(height = epaisseur, v = [0,0,1]) polygon([a,b,c,d,e,f,g,h]);
    
    difference(){
        rotate([90,90,0]) translate([-epaisseur - 2.5 ,-hauteur/2 + rayon,-largeur/2]) linear_extrude(height = 3.11) polygon([[0,0], [0, 4], [2.5/2, 4], [2.5/2, 2.5/2], [2.5,0]]);
        rotate ([90, 90, 0]) translate([0,-hauteur/2 + 10.1569 + 0.76 - e_badge,-largeur/2]) cylinder(h = 3.11, r = 3.24 + e_badge);
    }

    difference(){
        rotate([90,90,0]) translate([-epaisseur - 2.5 ,-hauteur/2 + rayon,largeur/2-3.11]) linear_extrude(height = 3.11) polygon([[0,0], [0, 4], [2.5/2, 4], [2.5/2, 2.5/2], [2.5,0]]);
        rotate ([90, 90, 0]) translate([0,-hauteur/2 + 10.1569 + 0.76 - e_badge,largeur/2-3.11]) cylinder(h = 3.11, r = 3.24 + e_badge);
    }
    rotate([0,0,90]) resize([0,55,0], [true, true, false]) linear_extrude(height = 0.5) import("{{SVG_PATH}}", center = true);
}
    
color("yellow",1.0) rotate([0,0,90]) resize([0,55,0], [true, true, false]) linear_extrude(height = 0.5) import("{{SVG_PATH}}", center = true);
