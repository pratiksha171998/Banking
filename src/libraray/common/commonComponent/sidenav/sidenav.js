import React,{Component} from 'react'
import  '../../../../resources/style/style.css'
import { Link} from 'react-router-dom'
import LoginStore from '../../Stores/loginStore'
// import SessionStore from '../../Stores/sessionStore'
// import * as SessionAction from '../../actions/sessionStorageAction'
// import * as routingAuth from '../../routingService/routingAuthentication'
// import AccountList from '../../../../modules/account-list/account-list'

class Sidenav extends Component{

    // constructor(props){
    //     super(props);
    //     this.sessionSuccess = this.sessionSuccess.bind(this);
    // }
    // sessionSuccess(){
    //     console.log("==========SIDENAV")
    // }

    render(){
        if(!LoginStore.isLoggedIn()){
            this.props.history.push("/login")
        }
        return(
            <div>
              <div className="sidenav">
                <div className="">
                    <Link to = {{ pathname :"/create-account", state : {route : "create-account" }}}>Create User Account</Link>
                    <Link to = "/account-list">User Management</Link>

                </div>
              </div>
            </div>
        )
    }
}
export default Sidenav