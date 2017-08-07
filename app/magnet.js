'use strict';

let Magnet = function (_objects) {

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
     * filter criteria, key is the attribute name, value is the filter criterion
     *
     * @type {object}
     */
    this.criteria = {};
};


Magnet.prototype = function() {



    // public functions
    return {

        changeFilter,
        resetFilter,
        filter
    };
}();
