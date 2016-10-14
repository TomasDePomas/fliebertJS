/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 8-10-16 - 16:59
 */

class Runner {
    constructor(properties) {

        this._currentTick = 0;
        this._tickCallbacks = [];
        this._targetTick = false;
        this._world = null;
        this._buffer = new Buffer();

        this._properties = _.extend({
            speed: 1  // Step the simulation takes per tick in seconds
        }, properties);
    }

    isContinuous() {
        return this._targetTick == false;
    }

    simulate(ticks = false) {
        if (ticks) {
            this._targetTick = this._currentTick + ticks;
        } else {
            this._targetTick = false;
        }

        this.tick();
        return this;
    }

    stop() {
        this._targetTick = this._currentTick;
        return this;
    }

    tick() {
        const bufferData = this.getWorld().advance(this.getSpeed());

        this._tickCallbacks.forEach(function (callback) {
            callback(this.getSpeed(), this);
        }.bind(this));

        this.saveToBuffer(bufferData);

        this._currentTick++;

        if (this.isContinuous() || this._currentTick < this._targetTick) {
            _.defer(this.tick.bind(this));
        }

        return this;
    }

    onTick(callback) {
        this._tickCallbacks.push(callback);
        return this;
    }

    clearOnTick() {
        this._tickCallbacks = [];
        return this;
    }

    saveToBuffer(data) {
        this.getBuffer().set(
            this.getCurrentTick() * this.getSpeed()
            , data
        )
    }

    getSpeed() {
        return this._properties.speed;
    }

    setWorld(world) {
        this._world = world;
        return this;
    }

    getWorld() {
        return this._world;
    }

    getBuffer() {
        return this._buffer;
    }

    getCurrentTick() {
        return this._currentTick;
    }
}