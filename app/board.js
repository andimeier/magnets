'use strict';

let board;

/**
 * side length of the game board
 */
let dimension;

/**
 * initialise board
 *
 * @param _dimension {number} dimension of the board (side length), e.g. 6 for a 6x6 game board
 */
function init(_dimension) {
    console.log('initialised board');


    if (!_dimension || _dimension < 2 || _dimension > 20) {
        throw new Error(`illegal dimension, must be between 2 and 20, but is ${_dimension}`);
    }

    dimension = _dimension;

    board = [];

}


/**
 * print the game board
 */
function print() {

    for (let y = 0; y < dimension; y++) {
        let line = '';
        for (let x = 0; x < dimension; x++) {
            let value = getValue(x, y);
            if (value) {
                // append next value
                line = `${line}${value}`;
            }
        }
        console.out(line);
    }
}


/**
 * clears the game board
 */
function clear() {

    _.times(dimension, (index) => {

    });

    for (let y = 0; y < dimension; y++) {
        for (let x = 0; x < dimension; x++) {
            setValue(x, y, null);
        }
    }
}


/**
 * returns the content of the specified field
 *
 * @param x {number}
 * @param y {number}
 * @return {string} '-'/'+'/'.' (forbidden)/null (empty)
 */
function getValue() {
    return board[y][x].value;
}


module.exports = {
    init,
    print,
    getValue,
    clear
};