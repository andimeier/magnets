'use strict';
let _ = require('lodash');

/**
 * constructor
 *
 * @param _length
 * @param _label {string} the "name" of the line, e.g. 'row 1'
 * @constructor
 */
let Line = function (_length, _label) {

    this.length = _length;
    this.constraints = {
        plus: null,
        minus: null
    };
    this.cells = [];
    this.label = _label;
};


Line.prototype = function () {

    /**
     * sets the constraints for a line
     *
     * @param constraints {object} number of plus/minus poles in this line, null or undefined if not defined.
     *   As an object in the form { plus, minus }
     */
    function setConstraints(constraints) {
        this.constraints = _.pick(constraints, [
            'plus',
            'minus'
        ]);

        console.log(`DEBUG constraints set to plus=${this.constraints.plus}, minus=${this.constraints.minus}`);
    }


    /**
     * returns the constraints for a line
     *
     * @return {object} number of plus/minus poles in this line, null if not defined.
     *   As an object in the form { plus, minus }
     */
    function getConstraints() {
        return this.constraints;
    }


    /**
     * adds a cell to this line
     *
     * @param cell {array{object}} an array of cell objects to be added
     */
    function addCells(cells) {
        this.cells.push(...cells);
    }


    /**
     * checks the validity of the cells in the line (no limit exceeded)
     *
     * @return {boolean} true if all constraints are met, false if line is not valid
     */
    function check() {

        ['plus', 'minus'].forEach((polarity) => {
            if (this[polarity]) {
                // count poles
                let sum = this.cells.reduce((sum, cell) => {
                    return sum + (cell.value === polarity ? 1 : 0);
                }, 0);
                if (sum > this[polarity]) {
                    // TODO add to errors: 'too many ${polarity} values in line ${this.label}'
                    return false;
                }
            }
        });

        return true;
    }


    // public functions
    return {
        setConstraints,
        addCells,
        check,
        getConstraints
    };
}();

module.exports = Line;