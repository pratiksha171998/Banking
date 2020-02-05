import dispatcher from "../Dispatcher";

 const Session_APP_ACTIONS = {
    SESSION_SUCCESS_DATA : 'logout',
    SESSION_ERROR_DATA : 'error'  
};

function sessionClearAction(){
    sessionStorage.clear()
    dispatcher.dispatch({
        type: Session_APP_ACTIONS.SESSION_SUCCESS_DATA,
        value: ''
    })
    
}
export {Session_APP_ACTIONS, sessionClearAction }