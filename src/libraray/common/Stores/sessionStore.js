import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import * as  SessionAction from '../actions/sessionStorageAction'


class SessionStore extends EventEmitter{

    constructor() {
        super();
        this.sessionData = "";
    }

     handleActions(action){
        switch(action.type){
            case SessionAction.Session_APP_ACTIONS.SESSION_SUCCESS_DATA :{
                this.sessionData = action.value;
                console.log(this.sessionData,"ENTERED DATA")
                this.emit("SESSION_SUCCESS");
                break;
            }
            case SessionAction.Session_APP_ACTIONS.SESSION_ERROR_DATA :{
                this.emit("SESSION_ERROR");
                break;
            }
            default : {

            }
        }
    }

    routingAuthForUser(){
    let token = sessionStorage.getItem('token')
    let isAdmin = sessionStorage.getItem('isAdmin')
    // isAdmin = window.atob(isAdmin);

    return !!(token && isAdmin === 'true')
 
};
    
}

const sessionStore = new SessionStore();
dispatcher.register(sessionStore.handleActions.bind(sessionStore));
export default sessionStore
