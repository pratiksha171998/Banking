import dispatcher from "../Dispatcher";
import * as apiUtil from '../apiCall/apiUtilities' 


const ACCOUNT_APP_ACTIONS = {
    ACCOUNT_SUCCESS_DATA : 'account',
    ACCOUNT_ERROR_DATA : 'error'  
};


 const ACCOUNT_VIEW_APP_ACTIONS = {
    ACCOUNT_VIEW_SUCCESS_DATA : 'View',
    ACCOUNT_VIEW_ERROR_DATA : 'View -error'  
};

 function careateAccountAction(data) {
    console.log(data)
    apiUtil.apiUtilPost(`/admin/createAccount`,  data)
   
    .then((res) => {
        dispatcher.dispatch({
            type: ACCOUNT_APP_ACTIONS.ACCOUNT_SUCCESS_DATA,
            value: res.data.response
        })
    }).catch(err => {
        console.log(err,"Error in create api api")
        dispatcher.dispatch({
            type: ACCOUNT_APP_ACTIONS.ACCOUNT_ERROR_DATA,
            value: ''
        })
    })
    
}

 function updateAccountAction(data,id) {
    console.log(data)
    const token = sessionStorage.getItem('token')
    data["_id"] = id
    apiUtil.apiUtilPost(`/admin/updatedetails`,  data,{
        headers : {"access_token" :   token}
      })
   
    .then((res) => {
        console.log(res,"response")
        dispatcher.dispatch({
            type: ACCOUNT_VIEW_APP_ACTIONS.ACCOUNT_VIEW_SUCCESS_DATA,
            value: res.data.response
        })
    }).catch(err => {
        console.log(err,"Error in create api api")
        dispatcher.dispatch({
            type: ACCOUNT_VIEW_APP_ACTIONS.ACCOUNT_VIEW_ERROR_DATA,
            value: ''
        })
    })
    
}

 export  {updateAccountAction, careateAccountAction, ACCOUNT_APP_ACTIONS, ACCOUNT_VIEW_APP_ACTIONS }