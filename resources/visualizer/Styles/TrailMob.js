/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 27-11-16 - 11:29
 */

Decorator.registerStyle('trailmob', function (rendererObject) {
    var scene = rendererObject.getScene();

    scene.beginPath();

    scene.fillStyle = 'black';
    scene.arc(rendererObject.getX(), rendererObject.getY(), 0.5, 0, 2 * Math.PI);
    scene.fill();

    scene.moveTo(rendererObject.getX(), rendererObject.getY());
    scene.lineTo(rendererObject.getX() - (rendererObject._velocity.getX() * 5),
        rendererObject.getY() - (rendererObject._velocity.getY() * 5));
    scene.strokeStyle = 'rgba(120, 0, 185, 0.5)';
    scene.stroke();
});