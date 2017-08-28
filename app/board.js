'use strict';
let _ = require('lodash');

let Line = require('./line');
let Cell = require('./cell');

let board;

/**
 * side lengths of the game board
 */
let dimensions = {};
let lines = {
    rows: [],
    columns: []
};
let cells;
let magnets;


/**
 * initialise board
 *
 * @param _dimensionX {number} X dimension of the board (side length), e.g. 6 for a 6x6 game board
 * @param _dimensionY {number} Y dimension of the board (side length), e.g. 6 for a 6x6 game board. If omitted,
 *   dimensionY will be considered equal to dimensionX (square game board)
 * @param layout{string} the cells in the format 'lrttlrlrtb[...]' where 'l', 'r', 't', 'b' stands for the magnet
 *   orientation (left/right/top/bottom)
 * @param rowConstraints {array} number of plus/minus poles per row, each item is an object of { plus, minus }
 *   (or any of these propeties omitted)
 * @param columnConstraints {array} number of plus/minus poles per row, each item is an object of { plus, minus }
 *   (or any of these propeties omitted)
 */
function init(_dimensionX, _dimensionY, layout, rowConstraints, columnConstraints) {
    console.log('initialised board');

    if (!_dimensionY) {
        _dimensionY = _dimensionX;
    }

    if (!_dimensionX || _dimensionX < 2 || _dimensionX > 20) {
        throw new Error(`illegal X dimension, must be between 2 and 20, but is ${_dimensionX}`);
    }
    if (!_dimensionY || _dimensionY < 2 || _dimensionY > 20) {
        throw new Error(`illegal Y dimension, must be between 2 and 20, but is ${_dimensionY}`);
    }

    dimensions.x = _dimensionX;
    dimensions.y = _dimensionY;

    cells = [];
    let cellIndex = 0;
    for (let y = 0; y < dimensions.y; y++) {
        for (let x = 0; x < dimensions.x; x++) {
            let cell = new Cell(x, y, layout.substr(cellIndex, 1));
            cells.push(cell);
            cellIndex++;
        }
    }

    // now that we have all cells in place, set opposite cells for each cell
    cells.forEach((cell) => {
        let oppositeCoordinates = cell.getOppositePoleCoordinates();

        // sanity check
        _.forEach(oppositeCoordinates, (coord, key) => {
            if (coord < 0 && coord >= dimensions[key]) {
                throw new Error(`coordinates of opposite pole out of range: ${key} == ${coord}`);
            }
        });

        cell.setOpposite(getCellAt(oppositeCoordinates.x, oppositeCoordinates.y));
    });

    board = [];

    // initialize rows and columns
    _.times(dimensions.y, (rowIndex) => {
        let row = new Line(dimensions.x, `row ${rowIndex + 1}`);

        // add cells for this row
        let rowCells = _.times(dimensions.x).map((column) => {
            return getCellAt(column, rowIndex);
        });
        row.addCells(rowCells);

        console.log(`rowconstraints = ${JSON.stringify(rowConstraints[rowIndex])}`);
        row.setConstraints(rowConstraints[rowIndex]);

        lines.rows.push(row);
    });
    _.times(dimensions.x, (columnIndex) => {
        let column = new Line(dimensions.y, `column ${columnIndex + 1}`);

        // add cells for this column
        let columnCells = _.times(dimensions.y).map((row) => {
            return getCellAt(columnIndex, row);
        });
        column.addCells(columnCells);

        column.setConstraints(columnConstraints[columnIndex]);

        lines.columns.push(column);
    });

    // TODO set neighbors
    // cell.setNeighbors(neighbors);
}


/**
 * print the game board
 */
function print() {


    for (let y = 0; y < dimensions.y; y++) {
        let line = '';

        for (let x = 0; x < dimensions.x; x++) {
            line = line + getCellAt(x, y).getPosition();
        }
        console.log(line);
    }


    console.log('+ -');
    for (let y = 0; y < dimensions.y; y++) {
        let subLines = [
            '',
            '',
            ''
        ];

        // print row contraints
        let constraints = lines.rows[y].getConstraints();
        let con = {
            plus: constraints.plus,
            minus: constraints.minus
        };
        if (!_.isNumber(con.plus)) {
            con.plus = ' ';
        }
        if (!_.isNumber(con.minus)) {
            con.minus = ' ';
        }

        subLines[1] += `${con.plus} ${con.minus}: `;
        subLines[0] += ' '.repeat(5);
        subLines[2] += ' '.repeat(5);


        for (let x = 0; x < dimensions.x; x++) {
            let cell = getCellAt(x, y);
            let pos = cell.getPosition();
            let v = cell.getValue();
            if (!v) {
                v = ' ';
            }

            // top line
            switch (pos) {
                case 'l':
                    subLines[0] += '+-+';
                    subLines[1] += `|${v} `;
                    subLines[2] += '+-+';
                    break;
                case 'r':
                    subLines[0] += '+-+';
                    subLines[1] += ` ${v}|`;
                    subLines[2] += '+-+';
                    break;
                case 't':
                    subLines[0] += '+-+';
                    subLines[1] += `|${v}|`;
                    subLines[2] += '+ +';
                    break;
                case 'b':
                    subLines[0] += '+ +';
                    subLines[1] += `|${v}|`;
                    subLines[2] += '+-+';
                    break;
            }
        }

        // terminate lines
        subLines[0] += '+';
        subLines[1] += '|';
        subLines[2] += '+';


        subLines.forEach((line) => {
            console.log(line);
        });
    }

    // print column contraints
    let subLines = [
        '+' + ' '.repeat(5),
        '-' + ' '.repeat(5)
    ];
    for (let x = 0; x < dimensions.x; x++) {
        let constraints = lines.columns[x].getConstraints();
        let con = {
            plus: constraints.plus,
            minus: constraints.minus
        };
        if (!_.isNumber(con.plus)) {
            con.plus = ' ';
        }
        if (!_.isNumber(con.minus)) {
            con.minus = ' ';
        }

        subLines[0] += `${con.plus}  `;
        subLines[1] += `${con.minus}  `;
    }
    subLines.forEach((line) => {
        console.log(line);
    });
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
function getValue(x, y) {
    return getCellAt(x, y).value;
}


/**
 * returns the cell on the specified position
 *
 * @param x {number}
 * @param y {number}
 * @return {object} the cell on that position
 */
function getCellAt(x, y) {
    return cells[y * dimensions.x + x];
}


/**
 * solve board by brute force iteration
 *
 * @return {boolean} success flag: true if board has been solved, false if not or if there are more than
 *   one solution (= illegal board)
 */
function solve() {

    /*
     * recursion: try all possible magnet positions and orientations
     *
     * @param level {number} the recursion depth = the magnet index to be permutated
     * @return {number} success flag: true if a solution has been found (= stop criteria for
     *   recursion), false if not
     */
    function recurse(level) {
        /*
         * try all three possible options for this magnet:
         * * one orientation
         * * opposite orientation
         * * no magnet on this position
         */


        return true;
    }


    return recurse(0);
}


module.exports = {
    init,
    print,
    getValue,
    clear,
    solve
};