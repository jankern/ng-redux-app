const selectActions = {
    SELECT_1: "SELECT_1",
    SELECT_2: "SELECT_2",
    SELECT_3: "SELECT_3",
    SELECT_4: "SELECT_4"
};


function select1(id) {
//   console.log('====== actionCreator: select1 ======');
//   console.log(id);
    return {
        type: selectActions.SELECT_1,
        payload: {
            selectId: id,
            selectName: 'Select 1'
        }
    }
};

function select2(id) {
  // console.log('====== actionCreator: select2 ======');
  // console.log(id);
    return {
        type: selectActions.SELECT_2,
        payload: {
            selectId: id,
            selectName: 'Select 2'
        }
    }
};

function select3(id) {
  // console.log('====== actionCreator: select3 ======');
  // console.log(id);
    return {
        type: selectActions.SELECT_3,
        payload: {
            selectId: id,
            selectName: 'Select 3'
        }
    }
};

export default {
    selectActions,
    select1,
    select2,
    select3
}
