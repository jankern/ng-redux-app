/**
 *  Util Service Class 
 */
export default class {
    constructor(messageService){
        this.messageService = messageService;
    }

    /**
	 *	Method to filter an object based on a given path
     *  @param      obj     The object
     *  @param      str     The object path
     *  @return     obj     The filtered object
	 */

	getObjectReference(/*Object*/obj, /*String*/path){
        let arr = path.split(".");
        for (var i = 0; i < arr.length; i++){
            obj = obj[arr[i]];
        }
        return obj;
	}

    /**
	 *	Method to filter an object based on a given object path and to set and replace values
     *  @param      obj     The object
     *  @param      path    The object path
     *  @param      value   The new vlaue to insert
	 */

	setObjectReference(/*Object*/obj, /*String*/path, /*String*/value){
        let arr = path.split(".");
        for (let i = 0; i < arr.length-1; i++){
            if(!obj[arr[i]]) {
                obj[arr[i]] = {};
            }else{
                obj = obj[arr[i]];
            }
        }
        obj[arr[arr.length-1]] = value;
	}

    /**
     *  Method to update the Browser Session Storage values
     *  @param      arr     List of session storage key value objects
     */

    updateSessionStorage(/*Array*/arr){
    
        for(let i = 0; i < arr.length; i++){
            for(let key in arr[i]){
                if(arr[i][key]){
                    sessionStorage.setItem(key, arr[i][key]);
                }else{
                     sessionStorage.removeItem(key);
                }
            }
        }

    }
    
    testMessage(){
        this.messageService.setXhrMessage('test1', 'info');
    }


}