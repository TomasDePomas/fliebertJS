"use strict";

/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 8-10-16 - 16:59
 */

const Vector = require('../Support/Vector');

const STATUS_RUNNING = 1;
const STATUS_CONTINUOUS = 2;
const STATUS_STOPPED = 3;
const STATUS_FINISHED = 4;

class Runner {
    constructor(storage, properties) {
        this._currentTick = 0;
        this._tickCallbacks = [];
        this._targetTick = false;
        this._world = null;
        this._storage = storage;

        this._properties = Object.assign({
            speed: 1  // Step the simulation takes per tick in seconds
        }, properties);

        if (storage) {
            this.initCommandBus();
        }
    }

    initCommandBus() {
        this.getStorage().onCommand(function (command, data) {
                this.receiveCommand(command, data);
            }.bind(this)
        );
    }

    simulate(ticks) {
        if (ticks != undefined) {
            this._targetTick = this._currentTick + ticks;
            this.updateStatus(STATUS_RUNNING);
        } else {
            this._targetTick = false;
            this.updateStatus(STATUS_CONTINUOUS);
        }

        this.tick();
        return this;
    }

    stop() {
        this._targetTick = this._currentTick;
        this.updateStatus(STATUS_STOPPED);
        return this;
    }

    tick() {
        const storageData = this.getWorld().advance(this.getSpeed());

        this._tickCallbacks.forEach(function (callback) {
            callback(this.getSpeed(), this);
        }.bind(this));

        this.saveToStorage(storageData);

        this._currentTick++;

        if (this.isContinuous() || this._currentTick < this._targetTick) {
            setTimeout(this.tick.bind(this), 0);
        } else {
            this.updateStatus(STATUS_FINISHED);
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

    saveToStorage(data) {
        this.getStorage().set(
            this.getCurrentTick() * this.getSpeed()
            , data
        )
    }

    updateStatus(status) {
        let text = '';
        switch (status) {
            case STATUS_CONTINUOUS:
                text = 'Continuous';
                break;
            case STATUS_RUNNING:
                text = 'Running';
                break;
            case STATUS_STOPPED:
                text = 'Stopped';
                break;
            case STATUS_FINISHED:
                text = 'Finished';
                break;
        }

        this.getStorage().updateStatus({
            code: status,
            text: text
        });
    }

    receiveCommand(command, data) {
        switch (command) {
            case 'simulate':
                this.simulate(data ? data.amount : undefined);
                break;
            case 'stop':
                this.stop();
                break;
            case 'clear':
                this._currentTick = 0;
                this._targetTick = 0;
                this.getStorage().clear();
                break;
            case 'attract':
                let attraction = new Vector(data.x, data.y);
                this.getWorld().getObjects().forEach(function (mob) {
                    var force = attraction.clone()
                        .subtract(mob.getLocation())
                        .divide(200);
                    mob.applyForce(force);
                });
                break;
            default:
                console.error('Unknown command "' + command + '"');
        }
    }

    isContinuous() {
        return this._targetTick == false;
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

    setStorage(storage) {
        this._storage = storage;
        return this;
    }

    getStorage() {
        return this._storage;
    }

    getCurrentTick() {
        return this._currentTick;
    }
}

module.exports = Runner;