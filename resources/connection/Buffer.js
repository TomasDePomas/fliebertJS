/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 18-10-16 - 14:50
 */

class Buffer {
    constructor(firebaseConfig, properties) {

        this._properties = Object.assign({}, properties);

        firebase.initializeApp(firebaseConfig);
        this._database = firebase.database();
        this._events = [];
        this._statusChangeCallbacks = [];
        this._newEventCallbacks = [];

        this.getEventsRef()
            .on("child_added", function (snapshot) {
                console.log('hit 0');
                this._set(snapshot.key, snapshot.val());
            }.bind(this));

        this.getImprintsRef()
            .on("child_added", function (snapshot) {
                console.log('hit 0');
                this._set(snapshot.key, snapshot.val());
            }.bind(this));

        this.getStatusRef()
            .on("value", function (snapshot) {
                this._statusChangeCallbacks.forEach(function(callback){
                    callback(snapshot.val());
                });
            }.bind(this));
    }

    sendCommand(command, data) {
        this.getCommandsRef().push({
            'command': command,
            'data': data || {}
        });
    }

    _set(stamp, data) {
        this._events[stamp] = data;
        this._newEventCallbacks.forEach(function(callback){
            console.log('hit 1');
            callback(stamp, data);
        });
        return this;
    }

    get(stamp) {
        return this._events[stamp] || [];
    }

    getLastTick() {
        return this._events.length - 1;
    }

    clear(){
        this._events = [];
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
    onStatusChange(callback){
        this._statusChangeCallbacks.push(callback);
        return this;
    }
    onNewEvent(callback){
        this._newEventCallbacks.push(callback);
        return this;
    }
}