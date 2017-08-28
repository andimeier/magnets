'use strict';

/**
 * constructor
 *
 * @param _x
 * @param _y
 * @param polePosition {string} one of 'l', 't', 'r', 'b' (standing for 'left', 'top', 'right', 'bottom')
 * @constructor
 */
let Cell = function (_x, _y, polePosition) {

    if (!'ltrb'.includes(polePosition)) {
        throw new Error(`unknown pole position "${polePosition}"`);
    }

    this.x = _x;
    this.y = _y;
    this.polePosition = polePosition;

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
};


Cell.prototype = function() {

    /**
     * sets the cell to 'minus' or 'plus'
     *
     * @param _polarity {string} one of 'plus', 'minus'
     * @param ignoreOtherPole {boolean} if set, the opposite pole will not be considered. If false, sets
     *   the opposite pole accordingly
     */
    function set(_polarity, ignoreOtherPole) {
        this.polarity= _polarity;

        if (!ignoreOtherPole) {
            this.oppositePole.set(reverse(_polarity), true);
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
     * @param polarity {string} one of 'plus', 'minus'
     * @return {string} opposite polarity, e.g. 'minus' or null if neither 'plus' nor 'minus' was given
     */
    function reverse(polarity) {
        if (polarity === 'plus') {
            return 'minus';
        } else if (polarity === 'minus') {
            return 'plus';
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
        return this.value;
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
        getValue
    };
}();

module.exports = Cell;