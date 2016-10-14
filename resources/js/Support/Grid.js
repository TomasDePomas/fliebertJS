/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 11-9-16 - 17:35
 */

class Grid {
    constructor(properties) {

        this._properties = _.extend({
            width: 200,
            height: 200,
            tileSize: 50
        }, properties);

        this._buckets = [];
        this._objects = [];
    }

    add(worldObject) {
        const buckets = this._getBucketsInBox(worldObject.getHitBox(), true);

        this._objects[worldObject.getId()] = buckets;
        worldObject.setBuckets(buckets);

        buckets.forEach(function (bucket) {
            this._buckets[bucket][worldObject.getId()] = worldObject;
        }.bind(this));

        return this;
    }

    update(worldObject) {
        const oldBuckets = worldObject.getBuckets();
        const id = worldObject.getId();
        const newBuckets = this._getBucketsInBox(worldObject.getHitBox(), true);

        worldObject.setBuckets(newBuckets);
        this._objects[id] = newBuckets;

        oldBuckets.forEach(function (bucket) {
            if (!_.contains(newBuckets, bucket)) {
                delete this._buckets[bucket][id];
            }
        }.bind(this));

        newBuckets.forEach(function (bucket) {
            if (!_.contains(oldBuckets, bucket)) {
                this._buckets[bucket][id] = worldObject;
            }
        }.bind(this));
    }

    remove(worldObject) {
        const buckets = worldObject.getBuckets();
        const id = worldObject.getId();

        buckets.forEach(function (bucket) {
            delete this._buckets[bucket][id];
        }.bind(this));

        worldObject.setBuckets([]);
        delete this._objects[id];
    }

    getTileSize() {
        return this._properties.tileSize;
    }

    setTileSize(value) {
        this._properties.tileSize = value;
        return this;
    }

    getObjectsByPoint(x, y) {
        const hash = this._getBucketHash(x, y);
        return this._getBucketContent(hash);
    }

    getObjectsByBox(box) {
        const hashes = this._getBucketsInBox(box);

        return this._getBucketsContent(hashes);
    }

    _getBucketsContent(hashes) {  // TODO: cleanup
        let objects = [];

        hashes.forEach(function (hash) {
            objects = objects.concat(this._getBucketContent(hash));
        }.bind(this));

        return _.unique(objects);
    }

    _getBucketContent(hash) {
        return this._buckets[hash] ? _.values(this._buckets[hash]) : [];
    }

    _getBucketsInBox(box, append = false) {
        const buckets = [];
        const tileSize = this.getTileSize();

        box.x1 = Math.floor(box.x1 / tileSize) * tileSize;
        box.x2 = Math.floor(box.x2 / tileSize) * tileSize;
        box.y1 = Math.floor(box.y1 / tileSize) * tileSize;
        box.y2 = Math.floor(box.y2 / tileSize) * tileSize;

        for (let cX = box.x1; cX <= box.x2; cX += tileSize) {
            for (let cY = box.y1; cY <= box.y2; cY += tileSize) {
                buckets.push(
                    this._getBucketHash(cX, cY, append)
                );
            }
        }
        return buckets;
    }

    _getBucketHash(x, y, append = false) {
        const hash = this._hashLocation(x, y);
        if (append && !this._buckets[hash]) {
            this._buckets[hash] = [];
        }
        return hash;
    }

    _hashLocation(x, y) {
        const tileSize = this.getTileSize();
        return Math.floor(x / tileSize) * tileSize + '_' +
            Math.floor(y / tileSize) * tileSize;
    }
}