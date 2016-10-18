const Firebase = require("firebase");
const Runner = require('./simulator/Core/Runner.js');
const World = require('./simulator/Core/World.js');
const Storage = require('./connection/Storage.js');
const Vector = require('./simulator/Support/Vector.js');

const TrailMob = require('./simulator/WorldObjects/TrailMob.js');


const world = new World();
const storage = new Storage({
    serviceAccount: "../serviceAccountCredentials.json",
    databaseURL: "https://fliebert-cf931.firebaseio.com"
});

const runner = new Runner(storage);

runner.setWorld(world);

for (var i = 0; i < 100; i++) {
    const mob = new TrailMob(world.getRandomPosition());
    mob.applyForce(new Vector(Math.random() * 4 - 2, Math.random() * 4 - 2));
    world.add(mob);
}