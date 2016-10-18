"use strict";

/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 22:43
 */

class Vector {
    constructor(x, y) {
        if (typeof x == 'object') {
            this._properties = x;
        } else {
            this._properties = {
                x: x,
                y: y
            };
        }
    }

    setX(value) {
        this._properties.x = value;
        return this;
    }

    getX() {
        return this._properties.x;
    }

    setY(value) {
        this._properties.y = value;
        return this;
    }

    getY() {
        return this._properties.y;
    }

    setDirection(angle, isRadians) {
        const hypotenuse = this.getMagnitude();
        this.setX(hypotenuse *
            Math.cos(isRadians ? angle : this.angleToRadians(angle)));
        this.setY(hypotenuse *
            Math.sin(isRadians ? angle : this.angleToRadians(angle)));

        return this;
    }

    getDirection(inRadians) {
        const radians = this.getAngle(true);

        if (this.getY() < 0) {
            if (this.getX() < 0) {
                return inRadians ? Math.PI - radians : this.radiansToAngle(Math.PI - radians);
            }
            return inRadians ? radians : this.radiansToAngle(radians);
        }
        if (this.getX() < 0) {
            return inRadians ? Math.PI + radians : this.radiansToAngle(Math.PI + radians);
        }
        return inRadians ? 2 * Math.PI - radians : this.radiansToAngle(2 * Math.PI - radians);
    }

    getAngle(inRadians) {
        const radians = Math.atan(Math.abs(this.getY()) / (Math.abs(this.getX())));
        return inRadians ? radians : this.radiansToAngle(radians);
    }

    setMagnitude(hypotenuse) {
        const radians = this.getAngle(true);
        const direction = this.getDirection();
        const adjacent = hypotenuse * Math.cos(radians);
        const opposite = hypotenuse * Math.sin(radians);

        if (direction < 90) {
            this.setX(adjacent);
            this.setY(-opposite);
            return this;
        }

        if (direction < 180) {
            this.setX(-adjacent);
            this.setY(-opposite);
            return this;
        }
        if (direction < 270) {
            this.setX(-adjacent);
            this.setY(opposite);
            return this;
        }

        this.setX(adjacent);
        this.setY(opposite);
        return this;
    }

    getMagnitude() {
        return Math.sqrt(
            Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2)
        );
    }

    add(vector) {
        return this.setX(this.getX() + vector.getX())
            .setY(this.getY() + vector.getY());
    }

    subtract(vector) {
        return this.add(vector.clone().revert());
    }

    multiply(multiplier) {
        this.setX(this.getX() * multiplier);
        this.setY(this.getY() * multiplier);

        return this;
    }

    divide(divider) {
        this.setX(this.getX() / divider);
        this.setY(this.getY() / divider);

        return this;
    }

    revert() {
        return this.setX(-this.getX())
            .setY(-this.getY());
    }

    normalize() {
        return this.limit(1);

    }

    limit(amount) {
        if (this.getMagnitude() > amount) {
            return this.setMagnitude(amount);
        }
        return this;
    }

    clone() {
        return new Vector(this.getX(), this.getY());
    }

    cartesian() {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }

    polar() {
        return {
            r: this.getMagnitude(),
            t: this.getDirection()
        };
    }

    angleToRadians(value) {
        return value * (Math.PI / 180);
    }

    radiansToAngle(value) {
        return value * (180 / Math.PI);
    }
}

module.exports = Vector;