import dispatcher from "../Dispatcher";
import * as apiUtil from '../apiCall/apiUtilities' 

 const LOGOUT_APP_ACTIONS = {
    LOGOUT_SUCCESS_DATA : 'logout',
    LOGOUT_ERROR_DATA : 'error'  
};

 function logout(data){
    let logoutdata = {
        access_token : data
    }
    apiUtil.apiUtilPost(`/logout`,logoutdata)
    .then((res) => {
        console.log(res.data.isLogout,"=====")
        dispatcher.dispatch({
            type: LOGOUT_APP_ACTIONS.LOGOUT_SUCCESS_DATA,
            value: res.data
        })
    }).catch(err => {
        dispatcher.dispatch({
            type: LOGOUT_APP_ACTIONS.LOGOUT_ERROR_DATA,
            value: ''
        })
    })
    
}

export {logout, LOGOUT_APP_ACTIONS}