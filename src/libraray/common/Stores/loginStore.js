import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import * as  LoginAction from '../actions/loginAction'

let {LOGIN_SUCCESS_DATA,LOGIN_ERROR_DATA} = LoginAction.LOGIN_APP_ACTIONS
class LoginStore extends EventEmitter{

    constructor() {
        super();
        this.enteredData = "";
        this.sessionStorage = ""
    }

     handleActions(action){
        switch(action.type){
            case LOGIN_SUCCESS_DATA :{
                this.enteredData = action.value;
                this.emit("Login_SUCCESS");
                break;
            }
            case LOGIN_ERROR_DATA :{
                this.emit("Login_ERROR");
                break;
            }
            default : {}
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
