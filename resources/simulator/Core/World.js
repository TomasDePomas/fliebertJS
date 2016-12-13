"use strict";

/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */

var Grid = require('../Support/Grid');

class World {
    constructor(properties) {

        this._objects = [];

        this._properties = Object.assign({
            width: 500,
            height: 500,
            bounces: false
        }, properties);

        this._grid = new Grid({
            width: this._properties.width,
            height: this._properties.height,
            tileSize: 50
        });
    }

    add(object) {
        object._addTo(this);
        this._objects.push(object);
        this.getGrid().add(object);

        return this;
    }

    bounceObject(object) {
        let velocity = object.getVelocity();

        if (object.getX() >= this.getWidth() || object.getX() <= 0) {
            velocity.setX(velocity.getX() * -1);
        }
        if (object.getY() >= this.getHeight() || object.getY() <= 0) {
            velocity.setY(velocity.getY() * -1);
        }

        object.setVelocity(velocity);
        return this;
    }

    advance(speed) {
        let eventData = [];

        if (this._objects.length == 0) {
            console.log('Warning: There are no objects in your world. No simulation will take place.');
        }

        this._objects.forEach(function (object) {
            object.advance(speed);

            if (this._properties.bounces) {
                this.bounceObject(object);
            }
            this.getGrid().update(object);

            if (object.hasChanged()) {
                eventData.push(object.getVelocityData());
            }
        }.bind(this));

        return eventData;
    }

    toggleWraps() {
        this._properties.bounces = !this._properties.bounces;
        return this;
    }

    getImprint() {
        let imprint = [];
        this._objects.forEach(function (object) {
            imprint.push(object.getImprint());
        });
        return imprint;
    }

    getWidth() {
        return this._properties.width;
    }

    getHeight() {
        return this._properties.height;
    }

    getObjects() {
        return this._objects;
    }

    getGrid() {
        return this._grid;
    }

    getCenter() {
        return {
            x: Math.floor(this.getWidth() / 2),
            y: Math.floor(this.getHeight() / 2)
        };
    }

    getRandomPosition() {
        return {
            x: Math.floor(Math.random() * this.getWidth()),
            y: Math.floor(Math.random() * this.getHeight())
        }
    }

}

module.exports = World;