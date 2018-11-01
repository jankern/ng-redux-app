/**
 *  Application config object
 */

import globals from './app.constants';


let config = {
    xhrservice: {
        headers: {
            default: {
                contentType: "application/json;charset=UTF-8",
                none: "none"
            }
        },
        verifyTenant: {
            url: "/oxseedint/register/services/rs.gui/checkavailability",
            type: "get",
            doubleCallPolicy: "reuse",
            cacheTimeout: 0
        },
        addTenant: {
            url: "/oxseedint/register/services/rs.gui/add",
            type: "post",
            doubleCallPolicy: "reuse",
            cacheTimeout: 0
        },
        confirmTenant: {
            url: "/oxseedint/register/services/rs.gui/confirm",
            type: "post",
            doubleCallPolicy: "reuse",
            cacheTimeout: 0
        },
        reconfirmTenant: {
            url: "/oxseedint/register/services/rs.gui/reconfirm",
            type: "post",
            doubleCallPolicy: "reuse",
            cacheTimeout: 0
        },
        responseCode: {
            error422: {
                type: 422,
                tknExprd: "tokenExpired",
                cdInvld: "codeInvalid",
                usrExstsCS: "userExistInCS",
                usrExstsMng: "userExistInMongoDB",
                ltrUsrExstsCS: "alterUserExistInCS",
                ltrUsrExstsMng: "alterUserExistInMongoDB",
                mlIdInld: "mailIdInvalid",
                tknInvld: "tokenInvalid",
                stsAlrdyCnfrmd: "statusAlreadyConfirmed",
                crtTntFld: "createTenantFailedInCS",
                idOccpd: "idOccupied"
            }
        },
        wss: {
            tenant: "hallesche",
            url: "/h2wdms2/online/wsserver/"
        }
    },
    validation: {
        input: {
            textlength: "128",
            email: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,})+$",
            password: "^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
            code: "^[0-9]{4}$"
        },
        security: {
            password: [{
                weak: "^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
            }, {
                mid: "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
            }, {
                strong: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
            }]
        }
    }

}

if (globals.ENV && globals.ENV !== "") {
    if (globals.ENV === 'dev') {
        for (let i in config.xhrservice) {
            if (config.xhrservice[i].url !== undefined) {
                config.xhrservice[i].url = '/stubs' + config.xhrservice[i].url + '.json',
                config.xhrservice[i].type = 'get'
            }

        }
    }
    console.info(globals.ENV);
}

export
default config;