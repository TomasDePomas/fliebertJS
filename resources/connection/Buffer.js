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
        this._buffer = [];
        this._statusChangeCallbacks = [];

        this.getTicksRef()
            .on("child_added", function (snapshot) {
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
        this._buffer[stamp] = data;
        return this;
    }

    get(stamp) {
        return this._buffer[stamp] || [];
    }

    getLastTick() {
        return this._buffer.length - 1;
    }

    clear(){
        this._buffer = [];
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
    onStatusChange(callback){
        this._statusChangeCallbacks.push(callback);
        return this;
    }
    clearOnStatusChange(){
        this._statusChangeCallbacks = [];
        return this;
    }
}