import registrationActions from '../model/model.actions';
import globals from '../app.constants';

export
default class {

    constructor($controller, $scope, $rootScope, $http, $q, $timeout, $ngRedux, xhrService, messageService, configService, socketService) {

        this.xhrService = xhrService;
        this.configService = configService;
        this.messageService = messageService;
        this.socketService = socketService;
        this.$scope = $scope;
        this.$timeout = $timeout;

        this.statusConfirmed = ''; // confirmed|alreadyconfirmed|invalid|expired|denied|failed

        let disconnect = $ngRedux.connect(
            state => this.onUpdate(state), // What we want to map to our target
            registrationActions // Actions we want to map to our target
        )(this); // Our target

        $scope.$on('$destroy', disconnect); // Cleaning house

    }

    /**
     *	Method to init angular variables
     */

    $onInit() {
        // Status to know if a reconfirmation took place previously
        if (this.isReconfirmed) {
            // Something can happen here
        }

        this.validatePattern = this.configService.getValidation().input;
        this.customerServiceMailTo = "mailto:support@maas.de";
    }

    /**
     *	Method to detect component screen and object changes
     */

    $doCheck() {

        // Depending on server response messages form fields that have been marked as error will be reset
        if (this.messageService.xhr.warn.codeInvalid) {
            if (this.selectedState.confirm.response.code !== undefined) {
                if (this.selectedState.confirm.response.code !== this.selectedState.confirm.code) {

                    this.messageService.xhr.warn.codeInvalid = false;
                    this.confirmationform.code.$setValidity('codeInvalid', true);

                }
            }
        }
    }

    $onChanges(changes){
        if(changes.isExternalConfirmed.currentValue){
            this.userConfirmedByExternalRequest();
        }
    }

    /**
     *	Method add screen form to the component data model
     */

    setConfirmationForm(confirmationform) {
        this.confirmationform = confirmationform;
    }

    /**
     *	Method to hook into key events to detect when enter is being pressed
     */

    getKeyCode(event) {
        event = event || window.event;
        if (event.keyCode === 13 && this.confirmationform.$valid) {
            this.confirmUser();
        }
    }
    
    /**
     *	Method to subscribe to the websocket service to retrieve athe registration process synchronously
     */
    
    asyncWssResultHandler(tenantId) {
        
        console.log('async_register_started');
        this.setContentTextVisbility(false);
        this.statusConfirmed = 'waiting_to_be_confirmed';
        
        this.socketService.wssSubscribe('registration', tenantId, (data) => {
            this.$timeout(() => {
                this.$scope.$apply(() => {
                    if(data){
                        console.log('register_done for ' + tenantId);
                        if(data.action == 'tenantReadyToServe' && data.object.id == tenantId){
                            this.statusConfirmed = 'confirmed';
                        }else if(data.action == 'tenantAssignmentFailedService' && data.object.id == tenantId){
                            this.statusConfirmed = 'confirmation_pending';     
                        }
                    }else{
                        console.log('wss_no_connection');
                        this.statusConfirmed = 'no_connection';
                    }
                });
            });
        });
    }
    
    /**
     *	Method to handle confirm response when it has been triggered by extern (email) request
     */
    
    userConfirmedByExternalRequest(){
        if(globals.CONFIRMRESPONSE !== "" && globals.CONFIRMRESPONSE.clientStatus === undefined){
            
            // create confirm response object to keep the response data 
            this.selectedState.confirm.response = {};
            for (let i in globals.CONFIRMRESPONSE) {
                if( globals.CONFIRMRESPONSE.hasOwnProperty( i ) ) {
                    this.selectedState.confirm.response[i] = globals.CONFIRMRESPONSE[i];
                }
            }
            
            // Pretend to return an ajax response for success or error and call the corresponding handler
            if(globals.CONFIRMRESPONSE.success){
                this.successResponseHandler({status:200});
            }else{
                this.messageService.setXhrMessage(globals.CONFIRMRESPONSE.error, 'warn');
                this.errorResponseHandler({status:422, data:globals.CONFIRMRESPONSE});
            }
            
            // set confirm action as performed to allow other views on screen
            globals.CONFIRMRESPONSE.clientStatus = 'done';

        }
    }

    /**
     *	Method to send confirmation data and react on responses
     */

    confirmUser() {

        let requestData = {};
        requestData.code = this.selectedState.confirm.code;
        requestData.id = this.selectedState.confirm.response !== undefined ? this.selectedState.confirm.response.emailId : this.selectedState.add.response.emailId;
        requestData.token = this.selectedState.confirm.response !== undefined ? this.selectedState.confirm.response.token : this.selectedState.add.response.token;

        this.xhrService.callEndpoint(
            this.configService.getXhrServices().confirmTenant,
            requestData,
            this.configService.getXhrServices().headers.default
        ).then(
            (success) => {
                
                this.successResponseHandler(success);

            }, (error) => {

                this.errorResponseHandler(error);
                return;

            }
        );

    }
    
    /**
     *	Method to handle http success response
     */
    
    successResponseHandler(success){

        // Subscribe for websocket messages about internal system registration status
        this.asyncWssResultHandler(success.data.tenantId);
        
    }
        
    /**
     *	Method to handle http error response
     */
    
    errorResponseHandler(error){

        // set status for view handling
        if (error.status === this.configService.getXhrServices().responseCode.error422.type) {
            // this.selectedState.confirm.code = '';
            if (error.data.error === this.configService.getXhrServices().responseCode.error422.tknExprd) {
                // token has been expired
                this.setContentTextVisbility(false);
                this.statusConfirmed = 'expired';
            } else if (error.data.error === this.configService.getXhrServices().responseCode.error422.cdInvld) {
                // code can be re-entered
                this.setContentTextVisbility(true);
                this.statusConfirmed = 'invalid';
                this.invalidCode();
            } else if (error.data.error === this.configService.getXhrServices().responseCode.error422.tknInvld ||
                error.data.error === this.configService.getXhrServices().responseCode.error422.mlIdInld) {
                // process will eb blocked
                this.setContentTextVisbility(false);
                this.statusConfirmed = 'denied';
            } else if (error.data.error === this.configService.getXhrServices().responseCode.error422.stsAlrdyCnfrmd) {
                // registration is done already
                this.setContentTextVisbility(false);
                this.statusConfirmed = 'alreadyconfirmed';
            } else if (error.data.error === this.configService.getXhrServices().responseCode.error422.crtTntFld) {
                // registration failed and has to be repeated
                this.setContentTextVisbility(false);
                this.statusConfirmed = 'failed';
            }
        }
        
    }

    /**
     *	Method to load reconfirm form component into the screen
     */

    resendConfirmMail() {
        this.reconfirm();
    }

    /**
     *	Method to handle invalid code response and set the form field to error
     */

    invalidCode() {
        // add xhr message  into form error validation message object - will be shown on screen
        for (let i in this.messageService.xhr.warn) {
            this.confirmationform.code.$setValidity(i, !this.messageService.xhr.warn[i]);
        }
        // add invalid code to response data object to detect user changes
        this.selectedState.confirm.response = this.selectedState.confirm.response === undefined ? {} : this.selectedState.confirm.response;
        this.selectedState.confirm.response['code'] = this.selectedState.confirm.code;

    }

    /**
     *	Method to return to start reistration screen
     */

    resetRegistration() {
        this.add();
    }

    /**
     *	Method to synchrounize compnent with the redux store
     */

    onUpdate(state) {
        return {
            selectedState: state.registrationReducer
        };
    }

    /**
     *	Method destroy the angular component
     */

    $onDestroy() {
        console.log('destroyed');
    }

    /**
     *	Method to define content text in screen depending on request state
     */

    setContentTextVisbility(status) {
        this.isContentVisible = status;
    }

};