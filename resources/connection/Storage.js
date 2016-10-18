"use strict";

/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 9-10-16 - 0:27
 */
const firebase = require('firebase');

class Storage {
    constructor(firebaseConfig, properties) {

        firebase.initializeApp(firebaseConfig);

        this._database = firebase.database();
        this._properties = Object.assign({}, properties);
        this._commandCallbacks = [];

        this.getCommandsRef()
            .on("child_added", function (snapshot) {
                let row = snapshot.val();
                this._commandCallbacks.forEach(function (callback) {
                    callback(row.command, row.data);
                });

                this.getCommandsRef().child(snapshot.key).remove();
            }.bind(this));
    }

    set(tick, data) {
        this.getTicksRef().child(tick).set(data);
        return this;
    }

    updateStatus(status) {
        this.getStatusRef().set(status);
        return this;
    }

    clear() {
        this.getTicksRef().set([]);
        return this;
    }

    getDatabase() {
        return this._database;
    }

    getCommandsRef() {
        return this.getDatabase().ref('commands/');
    }

    getTicksRef() {
        return this.getDatabase().ref('ticks/');
    }

    getStatusRef() {
        return this.getDatabase().ref('status/');
    }

    onCommand(callback) {
        this._commandCallbacks.push(callback);
        return this;
    }

    clearOnCommand() {
        this._commandCallbacks = [];
        return this;
    }
}

module.exports = Storage;