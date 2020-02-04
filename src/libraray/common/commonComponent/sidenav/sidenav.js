import React,{Component} from 'react'
import  '../../../../resources/style/style.css'
import { Link} from 'react-router-dom'
import LoginStore from '../../Stores/loginStore'
import SessionStore from '../../Stores/sessionStore'
import * as SessionAction from '../../actions/sessionStorageAction'
import * as routingAuth from '../../routingService/routingAuthentication'
// import AccountList from '../../../../modules/account-list/account-list'

export default class Dashboard extends Component{

    constructor(){
        super();
        this.sessionSuccess = this.sessionSuccess.bind(this);
    }
    componentDidMount(){
        if(!routingAuth.routingAuthForUser()){
            SessionAction.sessionClearAction()
            SessionStore.on("SESSION_SUCCESS",this.sessionSuccess)
            console.log("++++++INSIDE ACOOUNT LIST")
            this.props.history.push('/login')
          }
    }
    sessionSuccess(){
        console.log("==========SIDENAV")
    }

    render(){

        if(!LoginStore.isLoggedIn()){
            this.props.history.pus("/login")
        }
        console.log("HELLO SIDENAV")
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