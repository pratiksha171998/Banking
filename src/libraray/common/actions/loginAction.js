import dispatcher from "../Dispatcher";
import * as apiUtil from '../apiCall/apiUtilities' 

const LOGIN_APP_ACTIONS = {
    LOGIN_SUCCESS_DATA : 'login',
    LOGIN_ERROR_DATA : 'error'  
};

function loginDataAction(data){
    apiUtil.apiUtilPost(`/commonlogin`,data)
    .then((res) => {
        console.log(res.data.isAdmin,"=====")
        setToken(res.data.response.access_token,res.data.isAdmin) 
        dispatcher.dispatch({
            type: LOGIN_APP_ACTIONS.LOGIN_SUCCESS_DATA,
            value: res.data
        })
    }).catch(err => {
        dispatcher.dispatch({
            type: LOGIN_APP_ACTIONS.LOGIN_ERROR_DATA,
            value: ''
        })
    })
    
}


function setToken(access_token, isAdmin) {
    sessionStorage.setItem('token', access_token);
    // isAdmin=  window.btoa(isAdmin)
    sessionStorage.setItem('isAdmin', isAdmin);

    return
  }
  
export {loginDataAction, LOGIN_APP_ACTIONS}