import template from "./form-password.template.html";

class Controller {
    
    constructor($controller, $scope, configService, messageService){
        this.configService = configService;
        this.messageService = messageService;
        this.passwordValidationPattern = "";
    }
    
    $onInit(){
        
        this.model.$render = () => {
            this.inputValue = this.model.$viewValue;
        }
        
        this.passwordValidationPattern = this.configService.getValidation().input.password;
        
    }
    
    $onChanges(changes){
        this.abortForm = changes.abortForm.currentValue;

        if(this.abortForm){
           this.repeatedpassword = "";
        }
    }
    
    $doCheck() {
        
        if(this.inputValue){
            
            let inputChars = this.inputValue.pwdform.repeatedpassword.$viewValue;
            
            if(inputChars === this.inputValue.pwdform.password.$viewValue){
                this.inputValue.pwdform.repeatedpassword.$setValidity('reentered_password_unequal', true);
            }else{
                this.inputValue.pwdform.repeatedpassword.$setValidity('reentered_password_unequal', false);
            }
            
        }
        
    }
    
 
    
}

export default {

    template: template,
    
    require: {
        model: 'ngModel'
    },

    bindings: {
		selectedState: '=',
        abortForm: '<'
    },

    controller: ['$controller', '$scope', 'configService', 'messageService', Controller]

}