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
                console.log('Command received: '+ row.command);
                this._commandCallbacks.forEach(function (callback) {
                    callback(row.command, row.data);
                });

                this.getCommandsRef().child(snapshot.key).remove();
            }.bind(this));
    }

    storeEvents(tick, eventData) {
        this.getEventsRef().child(tick).set(eventData);
        return this;
    }

    storeImprint(tick, imprintData) {
        this.getImprintsRef().child(tick).set(imprintData);
        return this;
    }

    updateStatus(status) {
        this.getStatusRef().set(status);
        return this;
    }

    clear() {
        this.getEventsRef().set([]);
        this.getImprintsRef().set([]);
        return this;
    }

    getDatabase() {
        return this._database;
    }

    getCommandsRef() {
        return this.getDatabase().ref('commands/');
    }

    getEventsRef() {
        return this.getDatabase().ref('events/');
    }

    getImprintsRef() {
        return this.getDatabase().ref('imprints/');
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