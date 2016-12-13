"use strict";

/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */

var WorldObject = require('../Core/WorldObject');
var Vector = require('../Support/Vector');

class TrailMob extends WorldObject {

    constructor(properties) {
        super(properties);

        this._velocity = new Vector(0, 0);
        this._acceleration = new Vector(0, 0);
        this._style = 'trailmob';
    }

    draw() {
        var scene = this.getScene();
        scene.beginPath();
        scene.arc(this.getX(), this.getY(), this.getMass(), 0, 2 * Math.PI);
        scene.fill();

        scene.beginPath();
        scene.moveTo(this.getX(), this.getY());
        scene.lineTo(this.getX() + ( 5 * this.velocity.getX()), this.getY() + ( 5 * this.velocity.getY()));
        scene.strokeStyle = 'rgba(120, 0, 185, 0.5)';
        scene.stroke();

        return this;
    }

    updatePosition() {
        this._velocity.add(this._acceleration);
        this._velocity.limit(4);

        this._location.add(this._velocity);
        this._acceleration.multiply(0);
        return this;
    }

    applyForce(force) {
        this._acceleration.add(force);
        return this;
    }
}

module.exports = TrailMob;