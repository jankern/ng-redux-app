/**
 *  Application global constants
 */
//84172b16c1871748488843c92b1ffc22e2675c47e866bc464df2895d9990bade
// [A-Fa-f0-9]{64}
// email ^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$

// Environment variable taken from index.html
let tmpenv = "";
let tmpresp = "";

try {
    tmpenv = env;
} catch (e) {
    if (e instanceof ReferenceError) {
        tmpenv = "build";
    }
}

try {
    
    // extract confirm link from url for email and token
    tmpresp = response;
    let subPathPattern = new RegExp(",.*,");
    let hashPattern = new RegExp("^[A-Fa-f0-9]{64}$");
    let emailPattern = new RegExp(".*@.*\\.\\w{2,}");
 
    let pathArray = window.location.pathname.split('/');
    for(let i = 0; i < pathArray.length; i++){
        if(subPathPattern.test(pathArray[i])){
            let subPathArray = pathArray[i].split(",");
            for(let j = 0; j < subPathArray.length; j++){
                if(hashPattern.test(subPathArray[j])){
                    tmpresp.token = subPathArray[j]; 
                }
                if(emailPattern.test(subPathArray[j])){
                    tmpresp.emailId = subPathArray[j];   
                }
            }
        }
    }
    
} catch (e) {
    if (e instanceof ReferenceError) {
        tmpresp = "";
    }
}

const ENV = tmpenv;
const CONFIRMRESPONSE = tmpresp;


export
default {
    ENV, CONFIRMRESPONSE
};