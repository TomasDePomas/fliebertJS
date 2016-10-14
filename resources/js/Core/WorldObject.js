/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 9-9-16 - 16:16
 */

class WorldObject {
    constructor(properties) {
        this._properties = _.extend({
            x: 0,
            y: 0,
            size: 1
        }, properties);

        this._id = Math.uuid(15);
        this._world = null;
        this._buckets = [];
        this._location = new Vector(this._properties.x, this._properties.y);
        this._velocity = new Vector(0, 0);
    }

    _addTo(world) {
        this._world = world;
        return this;
    }

    advance(speed) {
        this.updatePosition(speed);

        return this;
    }

    updatePosition(speed) {
        this._location.add(this._velocity);
        return this;
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

    getClass() {
        return this.constructor.name;
    }

    getId() {
        return this._id;
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

    getBufferData() {
        return {
            x: this.getX(),
            y: this.getY(),
            size: this.getSize(),
            class: this.getClass(),
            id: this.getId()
        }
    }
}