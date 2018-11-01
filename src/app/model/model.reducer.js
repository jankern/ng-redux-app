import actions from './model.actions';

const INITIAL_STATE = {
    add: {
        //        firstname: "",
        //        lastname: "",
        //        emailid: "",
        //        password: "",
        //        credentials: {
        //            "dateofbirth": "",
        //            "gender": "",
        //            "company": "",
        //            "addressline1": "",
        //            "addressline2": "",
        //            "zipcode": "",
        //            "city": "",
        //            "country": ""
        //        },
//                response: {}
    },
    confirm: {
        //        code: "",
//                response: {}
    },
    reconfirm: {
        //        id: ""
    }
};


function registrationReducer(state = INITIAL_STATE, action) {

    console.info('STATE before');
    console.log(state);

    if (!action || !action.type) {
        return state;
    }
    switch (action.type) {
        case actions.run.ADD:
            return Object.assign({}, state, {
                viewId: action.payload.viewId,
                add: {
                    id: "",
                    password: "",
                    credentials: {
                        firstname: "",
                        lastname: "",
                        "dateofbirth": "",
                        "gender": "",
                        "company": "",
                        "addressline1": "",
                        "addressline2": "",
                        "zipcode": "",
                        "city": "",
                        "country": ""
                    },
                    response: {}
                }
            });
        case actions.run.RECONFIRM:
            return Object.assign({}, state, {
                viewId: action.payload.viewId
            });
        case actions.run.CONFIRM:
            return Object.assign({}, state, {
                viewId: action.payload.viewId
            });
        default:
            return state;
    }
}

export
default registrationReducer;