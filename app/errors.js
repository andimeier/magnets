'use strict';

let errors = [];


/**
 * registers an error
 *
 * @param error {string} error message
 */
function logError(error) {
    errors.push(error);
}


/**
 * @return {number} number of registered errors
 */
function count() {
    return errors.length;
}


module.exports = {
    logError,
    count
};