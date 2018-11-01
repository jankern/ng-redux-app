export default ['$parse', ($parse)=>{
    return {
        require: 'ngModel',
        link: (scope, elem, attrs, ctrl)=>{
            
//            console.log(scope.addform);
            
//            scope.$watch('addform.repeatedpassword.$modelValue', function(field) {
//                
//                if(field === scope.addform.password.$modelValue){
//                    scope.addform.repeatedpassword.$setValidity('re-entered password unequal', true);
//                }else{
//                    scope.addform.repeatedpassword.$setValidity('re-entered password unequal', false);
//                }
//                
//                console.log('Info re-entered password');
//                console.log(field);
//                console.log(scope.addform.password.$modelValue);
//                console.log(scope.addform.repeatedpassword.$valid);
//                
//            });
        }
    };
}]