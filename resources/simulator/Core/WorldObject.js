"use strict";

/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 9-9-16 - 16:16
 */

var Vector = require('../Support/Vector');

class WorldObject {
    constructor(properties) {
        this._properties = Object.assign({
            x: 0,
            y: 0,
            size: 1,
            id: ("0000" + (Math.random() * Math.pow(36,4) << 0).toString(36)).slice(-4)
        }, properties);

        this._style = null;
        this._world = null;
        this._buckets = [];
        this._location = new Vector(this._properties.x, this._properties.y);
        this._velocity = new Vector(0, 0);
        this._lastVelocity = new Vector(null, null);
    }

    _addTo(world) {
        this._world = world;
        return this;
    }

    advance(speed) {
        this.setLastVelocity(this.getVelocity());
        this.updatePosition(speed);

        return this;
    }

    updatePosition(speed) {
        this._location.add(this._velocity);
        return this;
    }

    hasChanged(){
        return !this.getVelocity().isEqual(this.getLastVelocity());
    }

    getY() {
        return this._location.getY();
    }

    setY(value) {
        this._location.setY(value);
        return this;
    }

    getX() {
        return this._location.getX();
    }

    setX(value) {
        this._location.setX(value);
        return this;
    }

    getLocation() {
        return this._location;
    }

    setLocation(vector) {
        this._location = vector;
        return this;
    }

    getSize() {
        return this._properties.size;
    }

    setSize(value) {
        this._properties.size = value;
        return this;
    }

    getId() {
        return this._properties.id;
    }

    getHitBox() {
        return {
            x1: this.getX() - this.getSize(),
            x2: this.getX() + this.getSize(),
            y1: this.getY() - this.getSize(),
            y2: this.getY() + this.getSize()
        };
    }

    getBuckets() {
        return this._buckets;
    }

    setBuckets(buckets) {
        this._buckets = buckets;
    }

    getVelocity() {
        return this._velocity;
    }

    setVelocity(vector) {
        this._velocity = vector;
        return this;
    }

    getLastVelocity() {
        return this._lastVelocity;
    }

    setLastVelocity(velocity) {
        this._lastVelocity = velocity.clone();
    }

    getImprint() {
        return {
            id: this.getId(),
            type: 'status',
            style: this.getStyle(),
            location: {
                x: this.getLocation().getX(),
                y: this.getLocation().getY()
            },
            velocity: {
                x: this.getVelocity().getX(),
                y: this.getVelocity().getY()
            }
        }
    }

    getVelocityData() {
        return {
            id: this.getId(),
            type: 'velocity',
            x: this.getVelocity().getX(),
            y: this.getVelocity().getY()
        }
    }

    getStyle() {
        return this._style;
    }
}

module.exports = WorldObject;
