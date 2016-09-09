/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */
class World {
    constructor(selector, properties) {
        if (!_.isString(selector)) {
            properties = selector;
            selector = false;
        }

        this.timer = false;
        this.rendering = false;
        this.wraps = false;
        this.currentTime = 0;
        this.objects = [];
        this.tickCallbacks = [];

        if (selector) {
            this.el = document.querySelector(selector);

            if (this.el.tagName != "CANVAS") {
                throw "Invalid world selector";
            }
            this.rendering = true;

        } else if (!properties.width || !properties.height) {
            throw "World dimensions reqired if no element is provided.";
        }

        this.properties = _.extend({
            width: selector ? this.el.offsetWidth : 0,
            height: selector ? this.el.offsetHeight : 0,
            tickLength: 10
        }, properties);

        this.scene = this.el.getContext('2d');

    }

    getWidth() {
        return this.properties.width;
    }

    getHeight() {
        return this.properties.height;
    }

    getCurrentTime() {
        return this.properties.currentTime;
    }

    setCurrentTime(value) {
        this.properties.currentTime = value;
        return this;
    }

    getTickLength() {
        return this.properties.tickLength;
    }

    setTickLength(value) {
        this.pauseSimulation();
        this.properties.tickLength = value;
        this.startSimulation();
        return this;
    }

    add(object) {
        object._addTo(this);
        this.objects.push(object);
        return this;
    }

    getObjects() {
        return this.objects;
    }

    startSimulation() {
        if (!this.timer) {
            var self = this;
            this.timer = setInterval(function () {
                self.tick();
            }, this.getTickLength());
        }
        return this;
    }

    pauseSimulation() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = false;
        }
        return this;
    }

    stopSimulation() {
        this.pauseSimulation();
        this.setCurrentTime(0);
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

    tick() {
        var self = this;
        this.clearScene();
        _.each(this.objects, function (object) {
            object.update();
            if (self.wraps) {
                this.flipObject(object);
            }
        });

        _.each(this.tickCallbacks, function (callback) {
            callback(this);
        });

        return this;
    }

    isRendering() {
        return this.rendering;
    }

    startRendering() {
        this.rendering = true;
        return this;
    }

    stopRendering() {
        this.rendering = false;
        return this;
    }

    toggleRendering() {
        this.rendering = !this.rendering;
        return this;
    }

    getScene() {
        return this.scene;
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

    onTick(callback) {
        this.tickCallbacks.push(callback);
        return this;
    }

    clearOnTick() {
        this.tickCallbacks = [];
        return this;
    }

    clearScene() {
        this.scene.clearRect(0, 0, this.getWidth(), this.getHeight());
        return this;
    }
}