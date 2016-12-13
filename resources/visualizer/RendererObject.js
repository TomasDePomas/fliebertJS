/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 21-10-16 - 18:09
 */

class RendererObject {
    constructor(scene, event) {
        this._properties = Object.assign({
            x: 0,
            y: 0,
            id: '',
            style: false
        }, event);

        this._scene = scene;
        this._location = new Vector(this._properties.x, this._properties.y);
        this._velocity = new Vector(0, 0);
    }

    processEvent(event) {
        switch (event.type) {
            case 'status':
                this.setLocation(new Vector(event.location.x, event.location.y));
                this.setVelocity(new Vector(event.velocity.x, event.velocity.y));
                break;
            case 'location':
                this.setLocation(new Vector(event.x, event.y));
                break;
            case 'velocity':
            default:
                this.setVelocity(new Vector(event.x, event.y));
                break;
        }
    }

    updatePosition(speed) {
        this._location.add(this._velocity);
        return this;
    }

    draw() {
        if (this._properties.style) {
            Decorator.renderStyle(this._properties.style, this);
        } else {
            this._scene.beginPath();
            this._scene.arc(this.getX(), this.getY(), 2, 0, 2 * Math.PI);
            this._scene.fillStyle = 'black';
            this._scene.fill();
        }
    }

    getY() {
        return this._location.getY();
    }

    getX() {
        return this._location.getX();
    }

    getId() {
        return this._properties.id;
    }

    getScene() {
        return this._scene;
    }

    setLocation(vector) {
        this._location = vector;
        return this;
    }

    setVelocity(vector) {
        this._velocity = vector;
        return this;
    }
}