/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 9-9-16 - 16:40
 */
import WorldObject from '../Core/WorldObject'

export default class Mob extends WorldObject {

    constructor(properties) {
        super(Object.assign({

        }, properties));

        this._velocity = new Vector((Math.random() - 0.5), (Math.random() - 0.5));
        this._target = false;
    }

    updatePosition() {
        this._location.add(this._velocity);

        return super.updatePosition();
    }

    observe() {
        const grid = this._world.getGrid();
    }

}