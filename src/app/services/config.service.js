/**
 *  Config Service Class 
 */

import serviceConfig from '../app.config';

export default class {
    
    constructor(){
        this._serviceConfig = serviceConfig;
    }

    /**
     *  Method to return the config object for xhr services
     */

    getXhrServices(){
        return this._serviceConfig.xhrservice;
    }
    
    /*
    *   Method to return the validation sub object
    */
    
    getValidation(){
        return this._serviceConfig.validation;
    }

}

