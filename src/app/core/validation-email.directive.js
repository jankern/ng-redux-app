export default ['$parse', ($parse)=>{
    return {
        require: 'ngModel',
        restrict: 'A',
        scope:{
            validateEmailPattern: '=validateEmail'
        },
        link: (scope, elem, attrs, ctrl)=>{
            
            let EMAIL_REGEXP = new RegExp(scope.validateEmailPattern);
            
            ctrl.$validators.unexpected_email_pattern = function(modelValue, viewValue) {
                // Example for checking empty field
                
                //if (ctrl.$isEmpty(modelValue)) {
                //    return true;
                //}
                
                if (EMAIL_REGEXP.test(viewValue)) {
                    // password matches and it's valid
                    return true;
                }

                // it is invalid
                return false;
            };
    
        }
    };
}]