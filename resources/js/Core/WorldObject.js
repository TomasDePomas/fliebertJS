/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 9-9-16 - 16:16
 */

class WorldObject {
    constructor(properties) {
        this.properties = _.extend({
            x: 0,
            y: 0,
            mass: 1
        }, properties);

        this.world = null;
        this.location = new Vector(this.properties.x, this.properties.y);
        this.velocity = new Vector(0, 0);
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

        return this;
    }

    updatePosition() {
        this.location.add(this.velocity);
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