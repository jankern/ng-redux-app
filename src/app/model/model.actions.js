const run = {
    ADD:        "ADD",
    CONFIRM:    "CONFIRM",
    RECONFIRM:  "RECONFIRM"
};


function add(id) {
    console.log('====== actionCreator: add ======');
    console.log(id);
    return {
        type: run.ADD,
        payload: {
            viewId: 'add'
        }
    }
};

function confirm(id) {
    console.log('====== actionCreator: confirm ======');
    console.log(id);
    return {
        type: run.CONFIRM,
        payload: {
            viewId: 'confirm'
        }
    }
};

function reconfirm(id) {
    console.log('====== actionCreator: reconfirm ======');
    console.log(id);
    return {
        type: run.RECONFIRM,
        payload: {
            viewId: 'reconfirm'
        }
    }
};

export default {
    run,
    add,
    reconfirm,
    confirm
}
