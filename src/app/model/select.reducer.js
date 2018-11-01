import customActions from './select.actions';

const INITIAL_STATE = {
    selectId: 0, selectName: "Start"
};

function calcId(id){
  id = parseInt(id, 10);
  return ++id;

}

function selectReducer(state = INITIAL_STATE, action) {
    console.info('ACTION Type');
    console.log(action.type);
    
    if (!action || !action.type) {
        return state;
    }
    switch (action.type) {
        case customActions.selectActions.SELECT_1:
            return Object.assign({}, state, {
                selectId: action.payload.selectId,
                selectName: action.payload.selectName,
                additionalData: calcId(action.payload.selectId)
            });
        case customActions.selectActions.SELECT_2:
            return Object.assign({}, state, {
              selectId: action.payload.selectId,
              selectName: action.payload.selectName
            });
        case customActions.selectActions.SELECT_3:
            return Object.assign({}, state, {
              selectId: action.payload.selectId,
              selectName: action.payload.selectName
            });
        default:
            return state;
    }
}

export default selectReducer;
