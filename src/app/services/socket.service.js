/**
 * XHR Service Class
 */

import serviceConfig from '../app.config';

export
default class {

    constructor($timeout, $window) {
        this._$timeout = $timeout;
        this._$window = $window;
        this._wssService = {};
        this._serviceConfig = serviceConfig;
        this.connectionError = '';
        
        this.initWSS();
    }
    
    _wssClientCallBack(){
         console.log("WSS Init Callback Called");
    }
    
    // Starting connection while service startup 
    
    initWSS(){
        console.log("WSS Init Calling...");
        try{
            this._wssService = new WebsocketService(this._serviceConfig.xhrservice.wss.tenant, this._serviceConfig.xhrservice.wss.url);
            this._wssService.init(this._wssClientCallBack);
        }catch(err){
            this.connectionError = err.message;
        }
    }
    
    /**
     *	Method to subscribe to a socket message type and receive data from socket server 
     *  @param      type            event name to send
     *  @param      id              tenant id to send
     *  @param      callback        callback function to be processed after req return           
     */
    
    wssSubscribe(type, id, callback){
        var params = {};
        params.type = type;
        params.id = id;
        params.callback = callback;
        if(this._wssService.isConnected()){
            this._wssService.subscribe(params);
        }else{
            // start the callback with undefined response to be able to react on in a component
            callback();
        }
    }
    

    static get $inject() {
        return ['$timeout', '$window'];
    }
}