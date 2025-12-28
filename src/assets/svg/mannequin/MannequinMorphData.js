/**
 * Mannequin Morph Data
 * 
 * Based on the "Morph Target" (Shape Interpolation) technique.
 * - BASE_PATH: The "Slim" (Size 6) shape coordinates.
 * - TARGET_PATH: The "Curvy" (Size 16) shape coordinates.
 * - COMMANDS: The SVG path commands (M, C, L, etc.)
 */

// The Base Shape (Slim)
export const BASE_POINTS = [
    [200, 50], [215, 50], [225, 65], [225, 85], [225, 95], [220, 105], [212, 110], // 0-6: Head R
    [235, 115], [255, 120], [265, 122], [270, 130], [268, 160], [265, 260],      // 7-12: Shoulder/Arm R
    [265, 275], [268, 285], [270, 295], [260, 300], [255, 270],                // 13-17: Hand R
    [252, 240], [250, 200], [245, 160],                                    // 18-20: Arm Inner R
    [245, 190], [250, 210], [252, 230],                                    // 21-23: Waist R
    [230, 190], [225, 180], [235, 210], [238, 230], [235, 260],                // 24-28: Hips R
    [232, 290], [230, 350], [230, 420], [230, 500], [232, 580], [228, 650],      // 29-34: Leg Outer R
    [230, 730], [235, 760], [215, 760], [212, 730],                          // 35-38: Foot R
    [208, 650], [205, 550], [202, 460], [198, 460],                          // 39-42: Inseam R
    [195, 550], [192, 650], [188, 730], [185, 760], [165, 760], [170, 730],      // 43-48: Foot/Leg L
    [168, 650], [170, 500], [170, 420], [170, 350], [168, 290], [165, 260],      // 49-54: Leg Outer L
    [162, 230], [165, 210], [175, 180], [170, 190], [148, 230],                // 55-59: Hips L (Note: Indices shifted slightly in user snippet/grouping)
    [150, 210], [155, 190], [155, 160], [150, 200], [148, 240], [145, 270],      // 60-65: Waist/Arm Inner L
    [140, 300], [130, 295], [132, 285], [135, 275], [135, 260], [132, 160],      // 66-71: Hand L
    [130, 130], [135, 122], [145, 120], [165, 115], [188, 110],                // 72-76: Shoulder L
    [180, 105], [175, 95], [175, 85], [175, 65], [185, 50], [200, 50]            // 77-82: Head L
];

// The Target Shape (Curvy)
export const TARGET_POINTS = [
    [200, 50], [215, 50], [225, 65], [225, 85], [225, 95], [220, 105], [212, 110], // Head (Same)
    [235, 115], [255, 120], [265, 122], [270, 130], [268, 160], [275, 260],      // Shoulder (Same), Arm (Wider)
    [275, 275], [278, 285], [280, 295], [270, 300], [265, 270],                // Hand (Moved out)
    [262, 240], [260, 200], [245, 160],                                    // Arm Inner (Moved out)
    [245, 190], [250, 210], [265, 230],                                    // Waist (Wider)
    [230, 190], [225, 180], [245, 210], [255, 230], [255, 260],                // Hips (Much Wider)
    [252, 290], [250, 350], [245, 420], [240, 500], [238, 580], [232, 650],      // Leg Outer (Thicker)
    [230, 730], [235, 760], [215, 760], [212, 730],                          // Foot (Same)
    [208, 650], [205, 550], [202, 460], [198, 460],                          // Inseam (Same)
    [195, 550], [192, 650], [188, 730], [185, 760], [165, 760], [170, 730],      // Foot (Same)
    [168, 650], [162, 580], [160, 500], [155, 420], [150, 350], [148, 290],      // Leg Outer L (Thicker)
    [145, 260], [145, 230], [155, 210], [175, 180], [170, 190], [135, 230],      // Hips L (Wider)
    [150, 210], [135, 210], [155, 160], [150, 200], [140, 240], [138, 270],      // Waist L (Wider)
    [130, 300], [120, 295], [122, 285], [125, 275], [125, 260], [132, 160],      // Hand L (Moved out)
    [130, 130], [135, 122], [145, 120], [165, 115], [188, 110],                // Shoulder (Same)
    [180, 105], [175, 95], [175, 85], [175, 65], [185, 50], [200, 50]            // Head (Same)
];

// SVG Commands
export const PATH_COMMANDS = [
    "M", "C", "", "", "C", "", "", "Q", "",
    "C", "", "", "L",
    "C", "", "", "L", "L",
    "C", "", "", "C", "", "", "Q", "",
    "C", "", "", "C", "", "",
    "L", "L", "L", "L", "C", "", "", "L",
    "C", "", "", "L", "L", "L",
    "C", "", "", "C", "", "",
    "C", "", "", "Q", "",
    "C", "", "", "C", "", "",
    "L", "L", "C", "", "", "L",
    "C", "", "", "Q", "",
    "C", "", "", "C", "", "", "Z"
];

// Influence Map: Which slider affects which point?
// 'bust', 'waist', 'hips', 'static'
// Arms/Hands track Hips for overall weight gain, or split between Bust/Hips.
// Based on typical weight distribution: Arms often track overall size (Hips/Bust mix).
// For simplicity and effectiveness:
// Hips slider -> Lower body (Hips to Ankles)
// Waist slider -> Waist area
// Bust slider -> Upper body (Chest, Shoulders, Arms)
export const POINT_ZONES = [
    'static', 'static', 'static', 'static', 'static', 'static', 'static', // 0-6: Head
    'bust', 'bust', 'bust', 'bust', 'bust', 'bust',                       // 7-12: Shoulder/Arm
    'bust', 'bust', 'bust', 'bust', 'bust',                               // 13-17: Hand
    'bust', 'bust', 'bust',                                               // 18-20: Arm Inner
    'waist', 'waist', 'waist',                                            // 21-23: Waist R
    'hips', 'hips', 'hips', 'hips', 'hips',                               // 24-28: Hips R
    'hips', 'hips', 'hips', 'hips', 'hips', 'hips',                       // 29-34: Leg Outer R
    'static', 'static', 'static', 'static',                               // 35-38: Foot R
    'hips', 'hips', 'hips', 'hips',                                       // 39-42: Inseam (Thigh gap usually affected by hips/weight) -> Let's make it 'hips'
    'static', 'static', 'static', 'static', 'static', 'static',           // 43-48: Foot/Leg L
    'hips', 'hips', 'hips', 'hips', 'hips', 'hips',                       // 49-54: Leg Outer L
    'hips', 'hips', 'hips', 'hips', 'hips',                               // 55-59: Hips L
    'waist', 'waist', 'bust', 'bust', 'bust', 'bust',                     // 60-65: Waist/Arm Inner L (Mixed zone)
    'bust', 'bust', 'bust', 'bust', 'bust', 'bust',                       // 66-71: Hand L
    'bust', 'bust', 'bust', 'bust', 'bust',                               // 72-76: Shoulder L
    'static', 'static', 'static', 'static', 'static', 'static'            // 77-82: Head L
];

export const COMMAND_POINT_COUNTS = {
    "M": 1, "L": 1, "Q": 2, "C": 3, "Z": 0
};
