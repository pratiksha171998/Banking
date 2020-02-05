import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import * as  LogoutAction from '../actions/logoutAction'

let {LOGOUT_SUCCESS_DATA,LOGOUT_ERROR_DATA } = LogoutAction.LOGOUT_APP_ACTIONS
class LogoutStore extends EventEmitter{

    constructor() {
        super();
        this.enteredData = "";
    }

    handleActions(action){
        console.log(action, "Action")
        switch(action.type){
            case LOGOUT_SUCCESS_DATA :{
                this.enteredData = action.value;
                console.log(this.enteredData,"ENTERED DATA")
                this.emit("Logout_SUCCESS");
                break;
            }
            case LOGOUT_ERROR_DATA :{
                this.emit("Logout_ERROR");
                break;
            }
            default : { }
        }
    }
    
    getLogoutData() {
        return this.enteredData;  
    }
}

const logoutStore = new LogoutStore();
dispatcher.register(logoutStore.handleActions.bind(logoutStore));
export default logoutStore
