/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */

class Mob {
    constructor(properties) {
        this.properties = _.extend({
            x: 0,
            y: 0,
            mass: 1
        }, properties);

        this.world = null;
        this.location = new Vector(this.properties.x, this.properties.y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
    }

    _addTo(world) {
        this.world = world;
        return this;
    }

    update() {
        this.updatePosition();

        if (this.getScene()) {
            this.draw();
        }
        return this;
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
        this.velocity.add(this.acceleration);
        this.velocity.limit(4);

        this.location.add(this.velocity);
        this.acceleration.multiply(0);
        return this;
    }

    applyForce(force) {
        this.acceleration.add(force);
        return this;
    }

    getScene() {
        return _.isNull(this.properties.world) ?
            false : this.world.isRendering() ?
            this.world.getScene() : false;
    }

    getMass() {
        return this.properties.mass;
    }

    setMass(value) {
        this.properties.mass = value;
        return this;
    }

    getY() {
        return this.location.getY();
    }

    setY(value) {
        this.location.setY(value);
        return this;
    }

    getX() {
        return this.location.getX();
    }

    setX(value) {
        this.location.setX(value);
        return this;
    }
}