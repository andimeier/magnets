'use strict';
let _ = require('lodash');
let options = require('./options');

/**
 * constructor
 *
 * @param _x
 * @param _y
 * @param polePosition {string} one of 'l', 't', 'r', 'b' (standing for 'left', 'top', 'right', 'bottom') or
 *   '.' standing for "no part of any magnet" (empty placeholder cell on the game board)
 * @constructor
 */
let Cell = function (_x, _y, polePosition) {

    if (!'ltrb'.includes(polePosition)) {
        throw new Error(`unknown pole position "${polePosition}"`);
    }

    this.x = _x;
    this.y = _y;

    if (polePosition !== '.') {
        this.polePosition = polePosition;
    } else {
        // placeholder
        this.forbidxxx(); // really? forbid? block?
    }

    // the cell's name, e.g. 'A1'
    this.name = `${String.fromCharCode(65 + _y)}${_x + 1}`;

    /**
     * the polarity of the cell, can be:
     *
     * * '+'
     * * '-'
     * * '.' (forbidden)
     * * null (initialised)
     *
     * @type {object}
     */
    this.polarity = null;

    /**
     * array of adjacent cells (of other magnets)
     *
     * @type {Array}
     */
    this.neighbors = [];

    /**
     * the "lines" (row resp. column) which the cell belongs to
     *
     * @type {Array} an array of line objects
     */
    this.lines = [];

    /**
     * list of allowed values for the cell
     *
     * @type {string[]}
     */
    this.allowed = ['+', '-', '.'];
};


Cell.prototype = function () {

    /**
     * sets the cell to '+' or '-', or '.' (which would be the same as calling forbid())
     *
     * @param _polarity {string} one of '+', '-' or '.' (= forbid)
     * @param ignoreOtherPole {boolean} if set, the opposite pole will not be considered. If false, sets
     *   the opposite pole accordingly
     */
    function set(_polarity, ignoreOtherPole) {

        if (!['+', '-', '.'].includes(_polarity)) {
            throw new Error(`illegal polarity value for cell, must be +, - or ., but is: ${_polarity}`);
        }

        if (_polarity === '.') {
            return this.forbid(ignoreOtherPole);
        }

        this.polarity = _polarity;

        if (!options.bruteForce) {
            // disallow this polarity for all adjacent cells
            this.neighbors.forEach((neighbor) => {
                neighbor.forget(_polarity);
            });
        }

        if (!ignoreOtherPole) {
            this.oppositePole.set(reverse(_polarity), true);
        }
    }


    /**
     * disallows a value for the cell. If there are no valid values left, the cell is set to "forbidden"
     *
     * @param polarity {string} the value to be disallowed
     */
    function forget(polarity) {
        _.pull(this.allowed, polarity);

        if (this.allowed.length === 1) {
            // only one possibility left
            let lastAllowed = this.allowed[0];

            if (lastAllowed === '.') {
                this.forbid();
            } else {
                this.set(lastAllowed);
            }
        }
    }


    /**
     * "forbids" the cell, i.e. marking it to be not part of a magnet
     *
     * @param ignoreOtherPole {boolean} if set, the opposite pole will not be considered. If false, sets
     *   the opposite pole accordingly
     */
    function forbid(ignoreOtherPole) {
        this.polarity = '.';

        if (!ignoreOtherPole) {
            this.oppositePole.forbid(true);
        }
    }


    /**
     * registers the opposite pole of a pole
     *
     * @param oppositePose {object} the cell object representing the opposite pole
     */
    function setOpposite(oppositePole) {
        this.oppositePole = oppositePole;
    }


    /**
     * returns the coordinates of the opposite pole
     *
     * @return {object} an object of { x, y } representing the coordinates of the opposite pole
     */
    function getOppositePoleCoordinates() {
        if (this.polePosition === 'l') {
            return {
                x: this.x + 1,
                y: this.y
            };
        }
        else if (this.polePosition === 'r') {
            return {
                x: this.x - 1,
                y: this.y
            };
        }
        else if (this.polePosition === 't') {
            return {
                x: this.x,
                y: this.y + 1
            };
        }
        else if (this.polePosition === 'b') {
            return {
                x: this.x,
                y: this.y - 1
            };
        }
    }


    /**
     * returns opposite pole of a pole
     *
     * @return oppositePose {object} the cell object representing the opposite pole
     */
    function getOpposite() {
        return this.oppositePole;
    }


    /**
     * returns the reverse polarity
     *
     * @param polarity {string} one of '+', '-'
     * @return {string} opposite polarity, e.g. '-' or null if neither '+' nor '-' was given
     */
    function reverse(polarity) {
        if (polarity === '+') {
            return '-';
        } else if (polarity === '-') {
            return '+';
        }

        return null;
    }


    /**
     * defines the neighboring cells
     *
     * @param neighbors {array{object}} array of cell objects which are adjacent to this cell
     */
    function setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }


    /**
     * defines the neighboring cells
     *
     * @return {string} one of 'l', 't', 'r', 'b' (standing for 'left', 'top', 'right', 'bottom')
     */
    function getPosition() {
        return this.polePosition;
    }


    /**
     * returns the value of the cell
     *
     * @returns {string} can be '+' or '-'
     */
    function getValue() {
        return this.polarity;
    }


    /**
     * declares that the given line (row or column) contains this cell
     *
     * @param line {object} the line object which this cell belongs to
     */
    function registerLine(line) {
        this.lines.push(line);
    }


    /**
     * returns the grid coordinates of the cell
     *
     * @return {object} coordinates object consisting of { x, y }
     */
    function getCoordinates() {
        return {
            x: this.x,
            y: this.y
        };
    }


    /**
     * return the list of allowed values for a cell
     *
     * @return {array} list of allowed cell values, e.g. [ '+', '-' ]
     */
    function allowedValues() {
        return this.allowed;
    }


    /**
     * return the list of allowed values for a cell
     *
     * @return {array} list of allowed cell values, e.g. [ '+', '-' ]
     */
    function hasNeighborWith(value) {
        return this.neighbors.some((neighbor) => neighbor.getValue() === value);
    }


    /**
     * returns the cell's name
     *
     * @returns {string} the cell's name, e.g. 'A1'
     */
    function getName() {
        return this.name;
    }


    // public functions
    return {
        set,
        forbid,
        //mark,
        getOppositePoleCoordinates,
        setOpposite,
        getOpposite,
        setNeighbors,
        getPosition,
        getValue,
        registerLine,
        getCoordinates,
        hasNeighborWith,
        allowedValues,
        forget,
        getName
    };
}();

module.exports = Cell;
