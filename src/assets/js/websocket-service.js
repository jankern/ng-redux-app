/**
 * Created by CALYSTO on 30/9/14.
 */
exports.WebsocketService = function(mandant, clientAdress) {
    var accessManager = null;
    var _self = this;
    var mandant = mandant; // 'hallesche';
    var clientAddress = window.location.protocol + "//" + window.location.hostname + clientAdress; //'/h2wdms2/online/wsserver/';
    var timeDelayToNotify = 500;
    this.connected = false;

    this.init = function (callback) {
        console.log("Trying to get WSS Client.", window.location.protocol + "//" + window.location.hostname + clientAdress);
        try {
            if (MaasWssClient) {
                console.log("WSS Client Exists.");
                MaasWssClient.WssClient.connect({
                        'address': clientAddress,
                        'mandant': mandant,
                        'userId': "admin" // TODO
                    })
                    .then(function (wssClient) {
                        console.log("WSS Client Connected successfully.");
                        _self.connected = true;
                        window.wssClient = wssClient;
                        accessManager = wssClient.concurrentAccessManager;
                        wssClient.messageExchangeManager.subscribe(wssClient.messageOperationHandler.handler.bind(wssClient.messageOperationHandler));
                        if (callback) {
                            callback();
                        }
                    }, function (err) {
                        console.log("WSS Client Disconnected." + err);
                    });
            } else {
                console.log("WSS Client is not Initialised or not found.");
            }
        } catch (e) {
            _self.connected = false;
            console.log("WSS Client is not Initialised or not found.");
        }
    };

    /* @param type type of object
     * @param id id of object
     * @param action action done on the object
     * @param relations relations of the object
     * @param data additional data
     */
    this.notify = function (params) {
        if (accessManager) {
            $timeout(function () {
                console.log("Notify :", params);
                //params.data.windowId = AppWindowPropertyService.getSubSessionID();
                accessManager.notify(params.type, params.id, params.action, params.relations, params.data);
            }, timeDelayToNotify, false);
        }
    };

    /* Subscribe to events on object with given type and id.
     * @param type type of object to subscribe to
     * @param id id of object to subscribe to
     * @param cb callback that will be called upon receiving the notification concerning this subscription */
    this.subscribe = function (params) {
        if (accessManager) {
            console.log("Subscribe :", params);
            accessManager.subscribe(params.type, params.id, params.callback);
        }
    };

    /**
     * Un-subscribe from the events on given object
     * @param type type of object to un-subscribe from
     * @param id id of object to un-subscribe from
     */
    this.unsubscribe = function (params) {
        if (accessManager) {
            console.log("Unsubscribe :", params);
            accessManager.unsubscribe(params.type, params.id);
        }
    };

    this.isConnected = function () {
        console.log("Isconnected::", _self.connected);
        return _self.connected;
    }
}