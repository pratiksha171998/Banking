import dispatcher from "../Dispatcher";
// import * as apiUtil from '../apiCall/apiUtilities' 

export const Session_APP_ACTIONS = {
    SESSION_SUCCESS_DATA : 'logout',
    SESSION_ERROR_DATA : 'error'  
};

export function sessionClearAction(){
    sessionStorage.clear()
    dispatcher.dispatch({
        type: Session_APP_ACTIONS.SESSION_SUCCESS_DATA,
        value: ''
    })
  
        
    
}