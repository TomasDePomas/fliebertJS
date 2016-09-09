/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 22:43
 */

Vector = function (x, y) {
    if (_.isObject(x)) {
        this.properties = x;
    } else {
        this.properties = {
            x: x,
            y: y
        };
    }
};

Vector.prototype = {
    setX: function (value) {
        this.properties.x = value;
        return this;
    },

    getX: function () {
        return this.properties.x;
    },

    setY: function (value) {
        this.properties.y = value;
        return this;
    },

    getY: function () {
        return this.properties.y;
    },

    setDirection: function (angle, isRadians) {
        var hypotenuse = this.getMagnitude();
        this.setX(hypotenuse *
            Math.cos(isRadians ? angle : this.angleToRadians(angle)));
        this.setY(hypotenuse *
            Math.sin(isRadians ? angle : this.angleToRadians(angle)));

        return this;
    },

    getDirection: function (inRadians) {
        var radians = this.getAngle(true);

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
    },
    getAngle: function (inRadians) {
        var radians = Math.atan(Math.abs(this.getY()) / (Math.abs(this.getX())));
        return inRadians ? radians : this.radiansToAngle(radians);
    },

    setMagnitude: function (hypotenuse) {
        var radians = this.getAngle(true);
        var direction = this.getDirection();
        var adjacent = hypotenuse * Math.cos(radians);
        var oposite = hypotenuse * Math.sin(radians);

        if (direction < 90) {
            this.setX(adjacent);
            this.setY(-oposite);
            return this;
        }

        if (direction < 180) {
            this.setX(-adjacent);
            this.setY(-oposite);
            return this;
        }
        if (direction < 270) {
            this.setX(-adjacent);
            this.setY(oposite);
            return this;
        }

        this.setX(adjacent);
        this.setY(oposite);
        return this;
    },

    getMagnitude: function () {
        return Math.sqrt(
            Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2)
        );
    },

    add: function (vector) {
        return this.setX(this.getX() + vector.getX())
            .setY(this.getY() + vector.getY());
    },

    subtract: function (vector) {
        return this.add(vector.clone().revert());
    },

    multiply: function (multiplier) {
        if (_.isNumber(multiplier)) {
            this.setX(this.getX() * multiplier);
            this.setY(this.getY() * multiplier);
        } else {
            console.warn('Mulitplication between two vectors is not supported');
        }
        return this;
    },

    divide: function (divider) {
        if (_.isNumber(divider)) {
            this.setX(this.getX() / divider);
            this.setY(this.getY() / divider);
        } else {
            console.warn('Division between two vectors is not supported');
        }
        return this;
    },

    revert: function () {
        return this.setX(-this.getX())
            .setY(-this.getY());
    },

    normalize: function () {
        return this.limit(1);

    },
    limit: function (amount) {
        if (this.getMagnitude() > amount) {
            return this.setMagnitude(amount);
        }
        return this;
    },

    clone: function () {
        return new Vector(this.getX(), this.getY());
    },

    cartesian: function () {
        return {
            x: this.getX(),
            y: this.getY()
        };
    },

    polar: function () {
        return {
            r: this.getMagnitude(),
            t: this.getDirection()
        };
    },

    angleToRadians: function (value) {
        return value * (Math.PI / 180);
    },

    radiansToAngle: function (value) {
        return value * (180 / Math.PI);
    }
};