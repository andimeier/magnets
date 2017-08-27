'use strict';

let board = require('./board');

console.log('yes');

let exampleBoard = {
    dimX: 4,
    dimY: 4,
    cells: 'ttlrbblrtlrtblrb',
    rows: [
        [2, 2],
        [1, 1],
        [1, 0],
        [1, 2]
    ],
    cols: [
        [1, 1],
        [1, 2],
        [2, 0],
        [1, 2]
    ]
};

board.init(exampleBoard.dimX, exampleBoard.dimY, exampleBoard.cells, exampleBoard.rows, exampleBoard.cols);

board.print();