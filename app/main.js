'use strict';

let board = require('./board');

console.log('yes');

let exampleBoard = {
    dimX: 4,
    dimY: 4,
    cells: 'ttlrbblrtlrtblrb',
    rows: [
        { plus: 2, minus: 2 },
        { plus: 1, minus: 1 },
        { plus: 1, minus: 0 },
        { plus: 1, minus: 2 }
    ],
    cols: [
        { plus: 1, minus: 1 },
        { plus: 1, minus: 2 },
        { plus: 2, minus: 0 },
        { plus: 1, minus: 2 }
    ]
};

board.init(exampleBoard.dimX, exampleBoard.dimY, exampleBoard.cells, exampleBoard.rows, exampleBoard.cols);

//board.solve();

board.print();