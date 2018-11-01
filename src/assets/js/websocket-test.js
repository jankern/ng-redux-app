var WSSService;

function initWSS() {
    console.log("WSS Init Calling...");
    WSSService = new WebsocketService();
    WSSService.init(_wssClientCallBack);
}

function _wssClientCallBack() {
    console.log("WSS Init Callback Called");
}

function WSSSubscribe(){
    var params = {};
    params.type = "registration";
    params.id = "comgmarc";
    params.callback = _subscribeCallBack;
    WSSService.subscribe(params);
}

function _subscribeCallBack(notification) {
    console.log("WSS Subscribtion: Callback Called", notification);
    if (notification) {
        if (notification.action === 'addcollection') {

        }
        else if (notification.action === 'deletecollection') {

        }
    }
}
