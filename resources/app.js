const argv = require('ee-argv');
const Firebase = require("firebase");
const Runner = require('./simulator/Core/Runner.js');
const World = require('./simulator/Core/World.js');
const Storage = require('./connection/Storage.js');
const Vector = require('./simulator/Support/Vector.js');

const TrailMob = require('./simulator/WorldObjects/TrailMob.js');


const world = new World({
    bounces: true
});
const storage = new Storage({
    serviceAccount: "../serviceAccountCredentials.json",
    databaseURL: "https://fliebert-cf931.firebaseio.com"
});

if (argv.has('clear') || argv.has('refresh')) {
    storage.clear();
    console.log('Storage cleared');
}

if (!argv.has('refresh')) {
    const runner = new Runner(storage, {
        imprintInterval: argv.has('imprints') ? argv.get('imprints') : 1000,
        tickBreak : argv.has('livemode') ? 300 : 0
    }, function () {
        console.log('Done');
    });

    runner.setWorld(world);

    var mobs = argv.has('mobs') ? argv.get('mobs') : 4;

    for (var i = 0; i < mobs; i++) {
        const mob = new TrailMob(world.getRandomPosition());
        mob.applyForce(new Vector(Math.random() * 4 - 2, Math.random() * 4 - 2));
        world.add(mob);
    }

    if (!argv.has('silent')) {
        runner.onTick(function (s, r, c) {
            console.log(c + ' / ' + ticks);
        });
    }

    if (!argv.has('livemode') || argv.has('ticks')){
        var ticks = argv.has('ticks') ? argv.get('ticks') : 1000;
        runner.simulate(ticks);
    }
}