/**
 *  Validation Service Class 
 */
export default class {
    
    constructor(){

        this.xhr = {error:{}, warn:{}, info:{}};
        this.progressStatus = false;
    }

    /**
     *  Method      add a message key to the xhr message object
     *  @param      messageKey     
     *  @param      messageType, messageString
     */

    setXhrMessage(messageKey, messageType, messageString){
        
        if(messageType == '' || messageType === undefined){
            messageType = 'info';
        }   
        
        let val;
        
        if(messageString !== undefined){
            val = messageString;
        }else{
            val = true;
        }
        
        this.xhr[messageType][messageKey] = val; 
    }
    
    /**
    *   Method to manually clear the message queue
    */
    
    clearXhrMessage(){
        this.xhr = {error:{}, warn:{}, info:{}};
    }
    
    /**
    *   Method to set progress element status for screen layout
    */
    
    setProgressStatus(status){
        this.progressStatus = status;
    }
    

}