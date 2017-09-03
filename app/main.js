'use strict';

let board = require('./board');

let exampleBoard1 = {
    dimX: 4,
    dimY: 4,
    cells: 'ttlrbblrtlrtblrb',
    rows: [
        { '+': 2, '-': 2 },
        { '+': 1, '-': 1 },
        { '+': 1, '-': 0 },
        { '+': 1, '-': 2 }
    ],
    cols: [
        { '+': 1, '-': 1 },
        { '+': 1, '-': 2 },
        { '+': 2, '-': 0 },
        { '+': 1, '-': 2 }
    ]
};

let exampleBoard2 = {
    dimX: 2,
    dimY: 2,
    cells: 'ttbb',
    rows: [
        { '+': 1, '-': 0 },
        { '+': 0, '-': 1 }
    ],
    cols: [
        { '+': 1, '-': 1 },
        { '+': 0, '-': 0 }
    ]
};

// wird FALSCH geloest:
let exampleBoard_36 = {
    dimX: 6,
    dimY: 6,
    cells: 'lrlrtt tlrtbb bttbtt tbbtbb blrblr lrlrlrr',
    rows: [
        { '+': null, '-': 2 },
        { '+': null, '-': 2 },
        { '+': null, '-': null },
        { '+': 3, '-': 3 },
        { '+': 2, '-': null },
        { '+': null, '-': null }
    ],
    cols: [
        { '+': 3, '-': 1 },
        { '+': null, '-': null },
        { '+': null, '-': 2 },
        { '+': null, '-': 3 },
        { '+': 2, '-': null },
        { '+': null, '-': null }
    ]
};

let exampleBoard_64 = {
    dimX: 8,
    dimY: 8,
    cells: 'lrlrlrlr tlrlrttt blrttbbb tttbbtlr bbblrbtt ttlrlrbb bbttlrlr lrbblrlr',
    rows: [
        { '+': null, '-': 3 },
        { '+': null, '-': null },
        { '+': 4, '-': 4 },
        { '+': null, '-': null },
        { '+': null, '-': 4 },
        { '+': 3, '-': null },
        { '+': 2, '-': null },
        { '+': 4, '-': 3 }
    ],
    cols: [
        { '+': null, '-': 4 },
        { '+': null, '-': 3 },
        { '+': 4, '-': 3 },
        { '+': null, '-': null },
        { '+': 3, '-': null },
        { '+': null, '-': 3 },
        { '+': 4, '-': null },
        { '+': 2, '-': null }
    ]
};

let exampleBoard = exampleBoard_36;

board.init(exampleBoard.dimX, exampleBoard.dimY, exampleBoard.cells, exampleBoard.rows, exampleBoard.cols);

if (board.solve()) {
    console.log('SOLVED!');
} else {
    console.log('... could not solve board');
}

board.print();