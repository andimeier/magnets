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

let exampleBoard = exampleBoard1;

board.init(exampleBoard.dimX, exampleBoard.dimY, exampleBoard.cells, exampleBoard.rows, exampleBoard.cols);

if (board.solve()) {
    console.log('SOLVED!');
} else {
    console.log('... could not solve board');
}

board.print();