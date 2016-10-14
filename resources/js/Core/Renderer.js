/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 8-10-16 - 17:13
 */

export default class Renderer {
    constructor(selector, buffer, properties) {

        if (selector) {
            this.el = document.querySelector(selector);

            if (this.el.tagName != "CANVAS") {
                throw "Invalid renderer selector";
            }
            this._scene = this.el.getContext('2d');

        } else {
            throw "Renderer initialized without target element";
        }

        this._buffer = buffer;

        this._properties = Object.assign({
            tickRate: 1,
            liveMode: false
        }, properties);

        this._width = this.el.offsetWidth;
        this._height = this.el.offsetHeight;
        this._isDrawing = false;
        this._currentFrame = 0;
        this._visibleTick = 0;
        this._drawCallbacks = [];
    }

    play() {
        this.setIsDrawing(true);

        this.draw();
        return this;
    }

    stop() {
        this.setIsDrawing(false);
        this.setLiveMode(false);
        return this;
    }

    draw() {
        if (this.getIsDrawing() || this.isLive()) {
            requestAnimationFrame(this.draw.bind(this));
        }
        const tick = this.getCurrentTick();
        const lastTick = this.getBuffer().getLastTick();

        if (tick > lastTick) {
            this.setIsDrawing(false);
            return;
        }

        if (this.getVisibleTick() != tick) {
            this.clearScene();

            const objects = this.getBuffer().get(tick);
            const scene = this.getScene();

            objects.forEach(function (object) {
                scene.beginPath();
                scene.arc(object.x, object.y, object.size, 0, 2 * Math.PI);
                scene.fillStyle = 'black';
                scene.fill();
            });

            this.setVisibleTick(tick);

            this._drawCallbacks.forEach(function (callback) {
                callback(tick, this);
            }.bind(this));
        }

        this.incrementCurrentFrame();
    }

    clearScene() {
        this.getScene().clearRect(0, 0, this.getWidth(), this.getHeight());
        return this;
    }

    isLive() {
        return this._properties.liveMode;
    }

    setLiveMode(status) {
        this._properties.liveMode = status;
        return this;
    }

    onDraw(callback) {
        this._drawCallbacks.push(callback);
        return this;
    }

    clearOnDraw() {
        this._drawCallbacks = [];
        return this;
    }

    getBuffer() {
        return this._buffer;
    }

    setBuffer(buffer) {
        this._buffer = buffer;
        return this;
    }

    getScene() {
        return this._scene;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    setIsDrawing(status) {
        this._isDrawing = status;
        return this;
    }

    getIsDrawing() {
        return this._isDrawing;
    }

    setTickRate(rate) {
        this._properties.tickRate = rate;
        return this;
    }

    getTickRate() {
        return this._properties.tickRate;
    }

    getCurrentTick() {
        if (this.isLive()) {
            return this.getBuffer().getLastTick();
        }

        return Math.floor(this.getCurrentFrame() / this.getTickRate());
    }

    getVisibleTick() {
        return this._visibleTick;
    }

    setVisibleTick(tick) {
        this._visibleTick = tick;
        return this;
    }

    getCurrentFrame() {
        return this._currentFrame;
    }

    setCurrentFrame(frame) {
        this._currentFrame = frame;
        return this;
    }

    incrementCurrentFrame() {
        this._currentFrame++;
        return this;
    }
}