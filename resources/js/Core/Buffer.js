/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 9-10-16 - 0:27
 */

class Buffer {
    constructor(properties) {

        this._buffer = [];

        this._properties = _.extend({}, properties);
    }

    set(tick, data) {
        this._buffer[tick] = data;
        return this;
    }

    get(tick) {
        return this._buffer[tick] || [];
    }

    getLastTick(){
        return this._buffer.length - 1;
    }

    getSize(){
        return this._buffer.length
    }

    last(){
        return _.last(this._buffer);
    }

    clear(){
        this._buffer = [];
        return this;
    }
}