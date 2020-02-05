import React,{Component} from 'react'
import  '../../../../resources/style/style.css'
import { Link} from 'react-router-dom'
import LoginStore from '../../Stores/loginStore'
import LogoutStore from '../../Stores/logoutStore'
import SessionStore from '../../Stores/sessionStore'


class Header extends Component{
 
    constructor(){
        super();
        this.state={
            isAdmin : false,
            isLogout : true
        };
        this.loginSuccess = this.loginSuccess.bind(this);
        this.logoutSuccess = this.logoutSuccess.bind(this);
        this.sessionSuccess = this.sessionSuccess.bind(this);
    }


    componentDidMount(){
        LoginStore.on("Login_SUCCESS", this.loginSuccess);
        LogoutStore.on("Logout_SUCCESS", this.logoutSuccess);
        SessionStore.on('SESSION_SUCCESS',this.sessionSuccess)
    }

    componentDidUpdate(){
        LoginStore.on("Login_SUCCESS", this.loginSuccess);
        LogoutStore.on("Logout_SUCCESS", this.logoutSuccess);
        SessionStore.on('SESSION_SUCCESS',this.sessionSuccess)
    }

    componentWillUnmount(){
        LoginStore.removeAllListeners("Login_SUCCESS", this.loginSuccess);
        LogoutStore.removeAllListeners("Logout_SUCCESS", this.logoutSuccess);
        SessionStore.removeAllListeners('SESSION_SUCCESS',this.sessionSuccess)
    }

    sessionSuccess(){
        this.setState({Logout : true}); 
    }

    loginSuccess(){
       
        let {isAdmin = false} = LoginStore.getLoginData();
         this.setState({isAdmin}); 
    }

    logoutSuccess(){
        let {isLogout = true} = LogoutStore.getLogoutData();
        this.setState({isLogout}); 
    }


    render(){
        let button,viewbutton,
         {isAdmin,isLogout} = this.state;
        if(sessionStorage.getItem("token")){
            button = <Link to = "/logout"  >Logout</Link>
            viewbutton = <Link to ="/view-profile">View Profile</Link>
        }else if(!sessionStorage.getItem("token")){
            button = <div> <Link to = "/login"  >Login</Link>
                     <Link to = "/" >Contact</Link> </div>
        }
        return(
                <div className="header">
                    <Link to = "/" className="logo">World Bank</Link>
                    <div className="header-right">
                        { !isAdmin && viewbutton}
                        { isLogout && button}
                    </div>
                </div>
                
        )
    }
}
export default Header