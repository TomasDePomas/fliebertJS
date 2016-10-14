/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */
import Grid from '../Support/Grid'

export default class World {
    constructor(properties) {

        this._objects = [];

        this._properties = Object.assign({
            width: 500,
            height: 500,
            wraps: false
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

    flipObject(object) {
        if (object.getX() > this.getWidth()) {
            object.setX(0);
        }
        if (object.getX() < 0) {
            object.setX(this.getWidth());
        }
        if (object.getY() > this.getHeight()) {
            object.setY(0);
        }
        if (object.getY() < 0) {
            object.setY(this.getHeight());
        }

        return this;
    }

    advance(speed) {
        const bufferData = [];

        this._objects.forEach(function (object) {
            object.advance(speed);

            if (this._properties.wraps) {
                this.flipObject(object);
            }
            this.getGrid().update(object);

            bufferData.push(object.getBufferData());
        }.bind(this));

        return bufferData;
    }

    toggleWraps() {
        this._properties.wraps = !this._properties.wraps;
        return this;
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