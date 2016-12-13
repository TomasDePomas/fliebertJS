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
    constructor(storage, properties, finishedCallback) {
        this._currentTick = 0;
        this._tickCallbacks = [];
        this._targetTick = false;
        this._world = null;
        this._storage = storage;
        this.callback = finishedCallback;

        this._properties = Object.assign({
            speed: 1,  // Step the simulation takes per tick in seconds
            tickBreak: 0,  // add a timeout between render ticks, to slow down the simulation. Needed for life mode
            imprintInterval: 1000
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
        const eventData = this.getWorld().advance(this.getSpeed());

        this._tickCallbacks.forEach(function (callback) {
            callback(this.getSpeed(), this, this._currentTick);
        }.bind(this));

        this.saveEventsToStorage(eventData);

        if (this.getCurrentTick() % this.getImprintInterval() == 0) {
            this.saveImprintToStorage(this.getWorld().getImprint());
        }

        this._currentTick++;

        if (this.isContinuous() || this._currentTick < this._targetTick) {
            setTimeout(this.tick.bind(this), this._properties.tickBreak);
        } else {
            this.saveImprintToStorage(this.getWorld().getImprint());
            this.updateStatus(STATUS_FINISHED);
            if(this.callback){
                this.callback();
            }
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

    saveEventsToStorage(eventData) {
        this.getStorage().storeEvents(
            this.getCurrentTick() * this.getSpeed()
            , eventData
        )
    }

    saveImprintToStorage(imprint) {
        this.getStorage().storeImprint(
            this.getCurrentTick() * this.getSpeed()
            , imprint
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

    getImprintInterval() {
        return this._properties.imprintInterval;
    }
}

module.exports = Runner;