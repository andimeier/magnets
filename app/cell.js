'use strict';

let Cell = function (_objects) {

    if (!_objects || !_.isArray(_objects)) {
        throw new Error('initialization parameter must be an array of objects');
    }

    /**
     * holds the list of objects to be filtered
     *
     * @type {array}
     */
    this.objects = _objects;

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
