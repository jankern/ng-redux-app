export default ['$parse', ($parse)=>{
    return {
        require: 'ngModel',
        restrict: 'A',
        scope:{
            validatePasswordPattern: '=validatePassword'
        },
        link: (scope, elem, attrs, ctrl)=>{
            
            let PASSWORD_REGEXP = new RegExp(scope.validatePasswordPattern);
            
            ctrl.$validators.unexpected_password_pattern = function(modelValue, viewValue) {
                
                // Example for checking empty field
                
                //if (ctrl.$isEmpty(modelValue)) {
                //    return true;
                //}

                if (PASSWORD_REGEXP.test(viewValue)) {
                    // password matches and it's valid
                    return true;
                }

                // it is invalid
                return false;
            };
    
        }
    };
}]
