window.onload = function () {

    var w = new World('#world', {
        stepSize: 50
    });

    for (var i = 0; i < 100; i++) {
        var mob = new Mob(w.getRandomPosition());
        mob.applyForce(new Vector(Math.random() * 4 - 2, Math.random() * 4 - 2));
        w.add(mob);
    }

    w.startSimulation();



    // TODO: move 'World object' logic to own class

    var center = new Vector(w.getCenter());
    w.onTick(function () {
        _.each(w.getObjects(), function (object) {
            var force = center.clone()
                .subtract(object.location)
                .divide(2000);

            object.applyForce(force);
        });
    });

    w.el.onmousedown = function (e) {
        var clickVector = new Vector(e.offsetX, e.offsetY);
        _.each(w.getObjects(), function (object) {
            var force = clickVector.clone()
                .subtract(object.location)
                .divide(200);

            object.applyForce(force);
        });
    };


};