'use strict';

let Cell = function (_x, _y, polePosition) {

    this.x = _x;
    this.y = _y;

    // determine opposite pole
    // ... ///TODO

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
};


Cell.prototype = function() {

    /**
     * sets the cell to 'minus' or 'plus'
     */
    function set(_polarity) {
        this.polarity= _polarity;
    }


    /**
     * "forbids" the cell, i.e. marking it to be not part of a magnet
     */
    function forbid() {
        this.polarity = '.';
    }


    // public functions
    return {
        set,
        forbid,
        mark
    };
}();
