export default ['$parse', ($parse)=>{
    return {
        require: 'ngModel',
        restrict: 'A',
        scope:{
            validateCodePattern: '=validateCode'
        },
        link: (scope, elem, attrs, ctrl)=>{
            
            let CODE_REGEXP = new RegExp(scope.validateCodePattern);
            
            ctrl.$validators.code_mismatch = function(modelValue, viewValue) {
                
                // Checking empty field
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (CODE_REGEXP.test(viewValue)) {
                    // code matches and it's valid
                    return true;
                }

                // it is invalid
                return false;
            };
    
        }
    };
}]