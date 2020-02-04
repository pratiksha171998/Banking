import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import * as  LoginAction from '../actions/loginAction'


class LoginStore extends EventEmitter{

    constructor() {
        super();
        this.enteredData = "";
        this.sessionStorage = ""
    }

     handleActions(action){
        console.log(action, "Action")
        switch(action.type){
            case LoginAction.LOGIN_APP_ACTIONS.LOGIN_SUCCESS_DATA :{
                this.enteredData = action.value;
                console.log(this.enteredData,"ENTERED DATA")
                this.emit("Login_SUCCESS");
                break;
            }
            case LoginAction.LOGIN_APP_ACTIONS.LOGIN_ERROR_DATA :{
                this.emit("Login_ERROR");
                break;
            }
            default : {

            }
        }
    }
    getCurrentStatus(){
        return (sessionStorage.getItem('token'))
    }
    getLoginData() {
        return this.enteredData;  
    }
    isLoggedIn() {
        return !!sessionStorage.getItem('token');
      }
}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));
export default loginStore
