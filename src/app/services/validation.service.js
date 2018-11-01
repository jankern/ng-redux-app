/**
 *  Validation Service Class 
 */
export default class {
    constructor(){
        console.log('Start validation');
    }

    /**
     *  Method to validate a String input as a JSON valid number or decimal
     *  @param      number  Number to validate
     *  @return     boolean
     */

    isNumber(number){
        let reg = new RegExp(/^\d+(\.\d+)?$/);
        return reg.test(number);
    }

}