import React,{Component} from 'react';
// import Login from '../login/login'
import { Redirect } from 'react-router-dom'
import LogoutStore from '../../libraray/common/Stores/logoutStore'
import  * as LogoutAction from '../../libraray/common/actions/logoutAction'


export default class Logout extends Component{


    constructor(props){
        super(props)
        this.state = ({
            sessionData : sessionStorage.getItem("token") 
            
        })
       this.logoutSuccess = this.logoutSuccess.bind(this)
    }
   
    componentDidMount(){
        LogoutAction.logout(this.state.sessionData)
        LogoutStore.on("Logout_SUCCESS", this.logoutSuccess); 
    }
    componentWillUnmount(){
        LogoutStore.removeAllListeners("Login_SUCCESS" ,this.logoutSuccess); 
    }
    logoutSuccess(){
        sessionStorage.clear()
        this.setState({sessionData : ''},()=>{
            console.log(this.state)
        })
    }
    
   
    render(){
        // if(!loginStore.isLoggedIn()){
        //     this.props.history.push('/login')
        // }
        if(sessionStorage.getItem("token")){
            console.log(sessionStorage.getItem("token"),"abbbbbbssss")
            sessionStorage.clear()
            this.setState({sessionData : ''})  
        }
        return(
            <div>
                <Redirect to = "/login"/>
            </div>
        )
    }
}

