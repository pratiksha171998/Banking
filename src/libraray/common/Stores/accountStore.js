import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import * as AccountAction from "../actions/accountAction";


let {ACCOUNT_SUCCESS_DATA,ACCOUNT_ERROR_DATA} = AccountAction.ACCOUNT_APP_ACTIONS
class CreateAccountStore extends EventEmitter  {

    constructor() {
        super();
        this.enteredData = "";
    }
    handleActions(action) {
        switch (action.type) {
            case ACCOUNT_SUCCESS_DATA: {
                console.log(action,'=======CREATE ACCOUNT Action type in store')
                this.enteredData = action.value;
                this.emit("Account_SUCCESS");
                break;
            }
            case ACCOUNT_ERROR_DATA : {
                this.emit("Account_ERROR");
                break;
            }
            default: { }
        }
    }

    getUserData() {
        return this.enteredData;
    }
    
}

const accountStore = new CreateAccountStore();
dispatcher.register(accountStore.handleActions.bind(accountStore));
export default accountStore;