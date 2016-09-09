/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 28-8-16 - 19:07
 */

class TrailMob extends WorldObject{
    constructor(properties) {
        super(properties);

        this.acceleration = new Vector(0, 0);
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
}