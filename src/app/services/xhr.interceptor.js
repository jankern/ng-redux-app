/**
 * XHR Interceptor Class
 */
export default class {

    constructor($rootScope, $q, messageService) {
        this._$q = $q;
        this.messageService = messageService;
        this.request = this.request.bind(this);
        this.requestError = this.requestError.bind(this);
        this.response = this.response.bind(this);
        this.responseError = this.responseError.bind(this);
    }
    
    // Acessed by $http service while request is successfully going to server

    request(config) {
        this.messageService.setProgressStatus(true);
        this.messageService.clearXhrMessage();
        return config || this._$q.when(config);
    }
    
    // Accessed by $http service while request is failing

    requestError(rejection) {
        return this._$q.reject(rejection);
    }

    // Accessed by $http service when response has been succesful (http 200)
    
    response(response) {
        this.messageService.setProgressStatus(false);
        
        console.log(response);
        let status = response.status.toString();
        // server side application infos
        if(status.indexOf('200') > -1){
            this.messageService.setXhrMessage(response.data, 'info');
        }
        
        return response || this._$q.when(response);
    }
    
    // Accessed by $http service when response failed (http 4x, 5x)

    responseError(rejection) {

        console.log(rejection);
        this.messageService.setProgressStatus(false);
        let status = rejection.status.toString();
        
        // server side validation errors
        if(status.indexOf('400') > -1){
            this.messageService.setXhrMessage('service_validation_failed', 'error');
        }
        
        // server side not available errors
        if(status.indexOf('401') > -1){
            this.messageService.setXhrMessage('unauthorized', 'error');
        }
        
        // server side application errors
        if(status.indexOf('422') > -1){
            this.messageService.setXhrMessage(rejection.data.error, 'warn');
        }
        
        // server side infra structure errors
        if(status.indexOf('50') > -1){
            this.messageService.setXhrMessage('service_error', 'error');
        }
        
        return this._$q.reject(rejection);
    }


    static get $inject() {
        return ['$rootScope', '$q', 'messageService'];
    }
}