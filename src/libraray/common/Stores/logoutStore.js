import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import * as  LogoutAction from '../actions/logoutAction'


class LogoutStore extends EventEmitter{

    constructor() {
        super();
        this.enteredData = "";
    }
     handleActions(action){
        console.log(action, "Action")
        switch(action.type){
            case LogoutAction.LOGOUT_APP_ACTIONS.LOGOUT_SUCCESS_DATA :{
                this.enteredData = action.value;
                console.log(this.enteredData,"ENTERED DATA")
                this.emit("Logout_SUCCESS");
                break;
            }
            case LogoutAction.LOGOUT_APP_ACTIONS.LOGOUT_ERROR_DATA :{
                this.emit("Logout_ERROR");
                break;
            }
            default : {

            }
        }
    }
    getLogoutData() {
        return this.enteredData;  
    }
}

const logoutStore = new LogoutStore();
dispatcher.register(logoutStore.handleActions.bind(logoutStore));
export default logoutStore
