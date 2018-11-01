import registrationActions from '../model/model.actions';

export default class {

    constructor($controller, $scope, $rootScope, $http, $q, $timeout, $ngRedux, xhrService, messageService, configService) {
        
        this.xhrService = xhrService;
        this.configService = configService;  
        this.messageService = messageService;
        this.$timeout = $timeout;
        this.$timeout = this.$timeout.bind(this);
        
        let disconnect = $ngRedux.connect(
            state => this.onUpdate(state), // What we want to map to our target
            registrationActions // Actions we want to map to our target
        )(this); // Our target

        $scope.$on('$destroy', disconnect); // Cleaning house

    }
    
    /**
     *	Method to init angular variables
     */
    
    $onInit(){
        this.statusReconfirmed = "";
        // get validation rules for form from config
        this.validatePattern = this.configService.getValidation().input;
        this.customerServiceMailTo = "mailto:support@maas.de";
    }
    
     /**
      *	Method to detect component screen and object changes
      */
    
    $doCheck() {

        // Depending on server response messages form fields that have been marked as error will be reset
        if(this.messageService.xhr.warn.alterUserExistInCS || this.messageService.xhr.warn.alterUserExistInMongoDB){
            if(this.selectedState.reconfirm.response !== undefined){
                if(this.selectedState.reconfirm.response.emailId !== this.selectedState.reconfirm.mailId){

                    this.messageService.xhr.warn.alterUserExistInCS = false;
                    this.messageService.xhr.warn.alterUserExistInMongoDB = false;
                    if(this.reconfirmationform.emailid !== undefined){
                        this.reconfirmationform.emailid.$setValidity('alterUserExistInCS', true);
                        this.reconfirmationform.emailid.$setValidity('alterUserExistInMongoDB', true);
                    }

                }
            }
        }
    }
    
    /**
     *	Method to cancel reconfirmation mail form and set the field to empty value
     */
    
    cancelReconfirmMailId(){
        this.selectedState.reconfirm.mailId = "";
        this.statusReconfirmed = "";
    }
    
    /**
     *	Method to open reconfirmation mail form and set the field to empty value
     */
    
    reconfirmMailId(){
        this.selectedState.reconfirm.mailId = "";
        this.statusReconfirmed = "mailid";    
    }
    
    /**
     *	Method to set reconfirmation mail form as successfully confirmed. Screen will load confirm component
     */
    
    mailConfirmed() {
        // Set Redux state for the data store
        this.messageService.clearXhrMessage();
        this.confirm();
    }
    
    /**
     *	Method to return ton confirm screen
     */
    
    returnToConfirm(){
        this.isReconfirmed = true;
        this.confirm();
    }
    
    /**
     *	Method add screen form to the component data model
     */
    
    setReconfirmationForm(reconfirmationform){
        this.reconfirmationform = reconfirmationform;
    }
    
    /**
     *	Method to hook into key events to detect when enter is being pressed
     */
    
    getKeyCode(event){
        event = event || window.event;
        if(event.keyCode === 13 && this.reconfirmationform.$valid){
            this.reconfirmUser();  
        }
    }
    
    /**
     *	Method to send reconfirmation data and react on responses
     */
    
    reconfirmUser(){
        
        let requestData = {};

        requestData.id = this.selectedState.confirm.response !== undefined ? this.selectedState.confirm.response.emailId : this.selectedState.add.response.emailId;
        requestData.token = this.selectedState.confirm.response !== undefined ? this.selectedState.confirm.response.token : this.selectedState.add.response.token;
        
        if(this.selectedState.reconfirm.mailId !== undefined){
            if(this.selectedState.reconfirm.mailId !== ""){
               requestData.options = {mailId: this.selectedState.reconfirm.mailId};
            }else{
               requestData.options = undefined;
            }
        }

        this.xhrService.callEndpoint(
            this.configService.getXhrServices().reconfirmTenant, 
            requestData, 
            this.configService.getXhrServices().headers.default
        ).then(
            (response)=>{
                // add response data to state object
                if (response.data){
                    for (let i in response.data){
                        if(response.data[i] !== undefined){
                            if(this.selectedState.confirm.response === undefined){
                                this.selectedState.confirm.response = {};
                            }
                            this.selectedState.confirm.response[i] = response.data[i];
                            // remove optional mail id from model as it is set to major mail id on server side
                            if(this.selectedState.reconfirm.mailId !== undefined && this.selectedState.reconfirm.mailId !== ''){
                               this.selectedState.reconfirm.mailId = '';
                            }
                        }
                    } 
                    
                }z
                
                // set status for view
                this.setContentTextVisbility(false);
                this.statusReconfirmed = 'reconfirmed';
                this.mailConfirmed();

            },
            (error)=>{
                // set status for view handling
                if(error.status === this.configService.getXhrServices().responseCode.error422.type){
                    
                    if(error.data.error === this.configService.getXhrServices().responseCode.error422.tknExprd){
                        // token has been expired
                        this.setContentTextVisbility(false);
                        this.statusReconfirmed = 'expired';
                    }else if(error.data.error === this.configService.getXhrServices().responseCode.error422.ltrUsrExstsCS || 
                            error.data.error === this.configService.getXhrServices().responseCode.error422.ltrUsrExstsMng){
                        // code can be re-entered
                        this.setContentTextVisbility(true);
                        this.statusReconfirmed = 'invalid';  
                        if(this.selectedState.reconfirm.mailId !== undefined ){
                            if(this.selectedState.reconfirm.mailId !== ''){
                                this.invalidMail();
                            }
                        }
                    }else if(error.data.error === this.configService.getXhrServices().responseCode.error422.tknInvld ||
                            error.data.error === this.configService.getXhrServices().responseCode.error422.mlIdInld){
                        // process will be blocked
                        this.setContentTextVisbility(false);
                        this.statusReconfirmed = 'denied';    
                    }
                    
                }
                 
                return;

            }
        );
    
    }
    
    /**
     *	Method to handle invalid mail response and set the form field to error
     */
    
    invalidMail(){
        // add xhr message  into form error validation message object - will be shown on screen
        for(let i in this.messageService.xhr.warn){
            this.reconfirmationform.emailid.$setValidity(i, !this.messageService.xhr.warn[i]);
        }
        
        // add invalid code to response data object to detect user changes
        this.selectedState.reconfirm.response = {};
        this.selectedState.reconfirm.response['emailId'] = this.selectedState.reconfirm.mailId;
 
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
    
    $onDestroy(){
        console.log('destroyed');
    }
    
    /**
     *	Method to return to start reistration screen
     */
    
    resetRegistration(){
        this.add();
    }
    
    /**
     *	Method to define content text in screen depending on request state
     */
    
    setContentTextVisbility(status){
        this.isContentVisible = status;
    }

};