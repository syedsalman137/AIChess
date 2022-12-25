export const pawnEvalWhite = [
    [ 0,   0,   0,   0,   0,   0,   0,   0],
    [50,  50,  50,  50,  50,  50,  50,  50],
    [10,  10,  20,  30,  30,  20,  10,  10],
    [ 5,   5,  10,  25,  25,  10,   5,   5],
    [ 0,   0,   0,  20,  20,   0,   0,   0],
    [ 5,  -5, -10,   0,   0, -10,  -5,   5],
    [ 5,  10, 10,  -20, -20,  10,  10,   5],
    [ 0,   0,   0,   0,   0,   0,   0,   0]
];

export const pawnEvalBlack = pawnEvalWhite.slice().reverse();

export const knightEvalNeutral = [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20,   0,   0,   0,   0, -20, -40],
    [-30,   0,  10,  15,  15,  10,   0, -30],
    [-30,   5,  15,  20,  20,  15,   5, -30],
    [-30,   0,  15,  20,  20,  15,   0, -30],
    [-30,   5,  10,  15,  15,  10,   5, -30],
    [-40, -20,   0,   5,   5,   0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50]
];

export const bishopEvalWhite = [
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10,   0,   0,   0,   0,   0,   0, -10],
    [-10,   0,   5,  10,  10,   5,   0, -10],
    [-10,   5,   5,  10,  10,   5,   5, -10],
    [-10,   0,  10,  10,  10,  10,   0, -10],
    [-10,  10,  10,  10,  10,  10,  10, -10],
    [-10,   5,   0,   0,   0,   0,   5, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20]
];

export const bishopEvalBlack = bishopEvalWhite.slice().reverse();

export const rookEvalWhite = [
    [  0,   0,   0,   0,   0,   0,   0,   0],
    [  5,  10,  10,  10,  10,  10,  10,   5],
    [ -5,   0,   0,   0,   0,   0,   0,  -5],
    [ -5,   0,   0,   0,   0,   0,   0,  -5],
    [ -5,   0,   0,   0,   0,   0,   0,  -5],
    [ -5,   0,   0,   0,   0,   0,   0,  -5],
    [ -5,   0,   0,   0,   0,   0,   0,  -5],
    [  0,    0,  0,   5,   5,   0,   0,   0]
];

export const rookEvalBlack = rookEvalWhite.slice().reverse();

export const queenEvalNeutral = [
    [-20, -10, -10,  -5,  -5, -10, -10, -20],
    [-10,   0,   0,   0,   0,   0,   0, -10],
    [-10,   0,   5,   5,   5,   5,   0, -10],
    [ -5,   0,   5,   5,   5,   5,   0,  -5],
    [  0,   0,   5,   5,   5,   5,   0,  -5],
    [-10,   5,   5,   5,   5,   5,   0, -10],
    [-10,   0,   5,   0,   0,   0,   0, -10],
    [-20, -10, -10,  -5,  -5, -10, -10, -20]
];

export const kingEvalWhite = [
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-20, -30, -30, -40, -40, -30, -30, -20],
    [-10, -20, -20, -20, -20, -20, -20, -10],
    [ 20,  20,   0,   0,   0,   0,  20,  20],
    [ 20,  30,  10,   0,   0,  10,  30,  20]
];

export const kingEvalBlack = kingEvalWhite.slice().reverse();

export const evalBlack = {
    'p' : pawnEvalBlack,
    'n' : knightEvalNeutral,
    'b' : bishopEvalBlack,
    'r' : rookEvalBlack,
    'q' : queenEvalNeutral,
    'k' : kingEvalBlack
}

export const evalWhite = {
    'p' : pawnEvalWhite,
    'n' : knightEvalNeutral,
    'b' : bishopEvalWhite,
    'r' : rookEvalWhite,
    'q' : queenEvalNeutral,
    'k' : kingEvalWhite
}

export const evalRepo =  {
    'b' : evalBlack, 
    'w' : evalWhite
}

export default evalRepo;

// P = 100
// N = 320
// B = 330
// R = 500
// Q = 900
// K = 20000

