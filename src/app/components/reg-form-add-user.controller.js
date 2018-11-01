import registrationActions from '../model/model.actions';
import globals from '../app.constants';

export default class{

    constructor($controller, $scope, $element, $ngRedux, configService, messageService, xhrService, utilService) {

        this.configService = configService;
        this.messageService = messageService;
        this.xhrService = xhrService;
        this.utilService = utilService;
        this.element = $element;

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
        
        // Jump to confirmation screen when constant CONFIRMRESPONSE is set  
        if(globals.CONFIRMRESPONSE !== '' && globals.CONFIRMRESPONSE.clientStatus === undefined){
           console.log('STATUS bei START');
           this.startConfirmScreenForExternalLink();
        }
        // get validation rules for form from config
        this.validatePattern = this.configService.getValidation().input;
        // display mode if and how to display the terms and conditions frame
        this.displayMode = "none"; //none|info|agree
        // Flag to reset the password field in child component which will block the form
        this.abortForm = false;
        // Flag to set terms and conditions as read
        this.isRead = false;
        // Flag to set terms and conditions as agreed
        this.isAgreed = false;
        // add form to the model for controller access
        this.isContentVisible = true;
        // if env is 'dev' screen test and helpers may be visible
        this.env = 'build';
        if (globals.ENV && globals.ENV !== "") {
            if (globals.ENV === 'dev') {
                 this.env = globals.ENV;
            }
        }
        
        console.log('++++++++++++++++++++++');
        console.log(this.env);
        
        this.scrollTextContent = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p><p>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.</p><p>Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.</p><p>Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere.</p><p>Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede.</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.</p><p>Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna</p>';
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
     *	Method to detect component screen and object changes
     */
    
    $doCheck() {
        
        // Depending on server response messages form fields that have been marked as error will be reset
        if(this.messageService.xhr.warn.userExistInMongoDB || 
          this.messageService.xhr.warn.userExistInCS ||
          this.messageService.xhr.warn.idOccupied){
            
            if(this.selectedState.add.response.emailId !== this.selectedState.add.id){
                
                this.messageService.xhr.warn.userExistInMongoDB = false;
                this.messageService.xhr.warn.userExistInCS = false;
                this.messageService.xhr.warn.idOccupied = false;
                
                this.addform.emailid.$setValidity('userExistInMongoDB', true);
                this.addform.emailid.$setValidity('userExistInCS', true);
                this.addform.emailid.$setValidity('idOccupied', true); 
            }
            
        }
       
    }
    
    /**
     *	Method as a util funtion if an object is empty 
     */
    
    isObjEmpty(obj){
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    }
    
    /**
     *	Method destroy the angular component
     */
    
    $onDestroy(){
        console.log('destroyed');
    }
    
    /**
     *	Method to display the terms and conditions layer as simple info layer
     */
    
    displayTermsAndConditionsAsInfo(){
        this.displayMode = "info";
    }
    
    /**
     *	Method to TEST the registration form with stub data
     */
    
    setStubData(){
        this.selectedState.add.credentials.firstname = "Test";
        this.selectedState.add.credentials.lastname = "Tester";
        this.selectedState.add.id = "test@tester.de";
        this.selectedState.add.password = "test06";
    }
    
    /**
     *	Method to set the terms and condition layer as invisible
     */
    
    cancelTermsAndConditions(){
        this.displayMode = 'none';
        this.isAgreed = false;
    }
    
    /**
     *	Method to set terms and conditions screen as read to be able to send the registration request
     */
    
    markTermsAndConditionsAsRead(){
       this.isRead = true; 
    }
    
    /**
     *	Method add screen form to the component data model
     */
    
    setAddForm(addform){
        this.addform = addform;
    }
    
    /**
     *	Method to hook into key events to detect when enter is being pressed
     */
    
    getKeyCode(event){
        event = event || window.event;
        if(event.keyCode === 13 && this.addform.$valid){
            this.next();  
        }
    }
    
    /**
     *	Method to load the terms and condition screen layer
     */
    
    next(){
        this.displayMode = "agree";
    }
    
    /**
     *  Method to jump into the screen response screen when confirmation link is sent by email client
     */
    
    startConfirmScreenForExternalLink(){
        // Change the screen / view ID
        this.confirm()
        // pass the status over to the confirm component to get confirmation data from a Constant
        this.isExternalConfirmed = true;
    }
    
    /**
     *	Method to send registration data and react on responses
     */
    
    addUser(){
        // if user has agreed terms and conditions registration data will be transferred
        if(this.isAgreed){
            this.abortForm = false;
            
            let requestData = {};
            for (let h in this.selectedState.add){
                if(this.selectedState.add[h]){
                    console.log(h);
                    console.log(this.selectedState.add[h]);
                    if(this.selectedState.add[h] !== null && typeof this.selectedState.add[h] === 'object'){
                        if(h !== 'response'){
                            requestData[h] = {};
                            for (let g in this.selectedState.add[h]){
                                if(this.selectedState.add[h][g] !== ""){
                                   requestData[h][g] = this.selectedState.add[h][g];
                                }
                            }
                        }
                    }else{
                       requestData[h] = this.selectedState.add[h] 
                    }
                }
            }
            
            // In case of a repeated registration remove the confirm response emailid
            if(this.selectedState.confirm.response !== undefined){
                this.selectedState.confirm = {};
            }
            console.log(requestData);
            
            this.xhrService.callEndpoint(
                this.configService.getXhrServices().addTenant, 
                requestData,  
                this.configService.getXhrServices().headers.default
            ).then(
                (response)=>{

                    // add response data to state object
                    if (response.data){
                        for (let i in response.data){
                            if(response.data[i]){
                               this.selectedState.add.response[i] = response.data[i];
                            }
                        } 
                    }
                    
                    // set application state to confirm
                    this.setUserAsConfirmed();
                    
                },
                (error) => {
                    // set status for view handling
                    if(error.status === this.configService.getXhrServices().responseCode.error422.type){
                        if(error.data.error === this.configService.getXhrServices().responseCode.error422.usrExstsCS ||
                          this.configService.getXhrServices().responseCode.error422.usrExstsMng){
                            // store the already occupied mail id
                            this.selectedState.add.response.emailId = error.data.emailId;
                            this.userExists();
                        }
                    }
                    return;
                }
            );
        }
    }
    
    /**
     *	Method to handle invalid code response and set the form field to error
     */
    
    userExists(){
        // set Status for previous view in case server validation failed 
        this.displayMode = 'none';
        this.isAgreed = false;
        // add xhr message  into form error validation message object - will be shown on screen
        for(let i in this.messageService.xhr.warn){
            this.addform.emailid.$setValidity(i, !this.messageService.xhr.warn[i]);
        }

        this.abortForm = true;
    }
    
    /**
     *	Method to load the confirm form compnent into the screen
     */
    
    setUserAsConfirmed(){
        // set status for view in case of success
        this.confirm();
    }
    
    /**
     *	Method to define content text in screen depending on request state
     */
    
    setContentTextVisbility(status){
        this.isContentVisible = status;
    }
    
};