/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */
Mob = function (properties) {
    this.properties = _.extend({
        x: 0,
        y: 0,
        mass: 1
    }, properties);

    this.world = null;
    this.location = new Vector(this.properties.x, this.properties.y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
};

Mob.prototype = {
    _addTo: function (world) {
        this.world = world;
        return this;
    },

    update: function () {
        this.updatePosition();

        if (this.getScene()) {
            this.draw();
        }
        return this;
    },

    draw: function () {
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
    },

    updatePosition: function () {
        this.velocity.add(this.acceleration);
        this.velocity.limit(4);

        this.location.add(this.velocity);
        this.acceleration.multiply(0);
        return this;
    },

    applyForce: function (force) {
        this.acceleration.add(force);
        return this;
    },

    getScene: function () {
        return _.isNull(this.properties.world) ?
            false : this.world.isRendering() ?
            this.world.getScene() : false;
    },

    getMass: function () {
        return this.properties.mass;
    },

    setMass: function (value) {
        this.properties.mass = value;
        return this;
    },

    getY: function () {
        return this.location.getY();
    },

    setY: function (value) {
        this.location.setY(value);
        return this;
    },

    getX: function () {
        return this.location.getX();
    },

    setX: function (value) {
        this.location.setX(value);
        return this;
    }
};