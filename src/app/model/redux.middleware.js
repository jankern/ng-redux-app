const logger = store => next => action => { // https://github.com/reactjs/redux/blob/master/docs/advanced/Middleware.md#attempt-5-removing-monkeypatching
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result;
}

export default logger;
