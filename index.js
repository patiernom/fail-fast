'use strict';

module.exports = function(callback, continuation, thisArg){
    return function(error){
        if (error) {
            if (callback){
                callback(error);
            }
            return;
        }
        if (continuation) {
            thisArg = thisArg || null;
            continuation.apply(thisArg, Array.prototype.slice.call(arguments, 1));
        }
    };
};
