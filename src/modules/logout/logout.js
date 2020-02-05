import React,{Component} from 'react';
import { Redirect } from 'react-router-dom'
import LogoutStore from '../../libraray/common/Stores/logoutStore'
import  * as LogoutAction from '../../libraray/common/actions/logoutAction'


class Logout extends Component{


    constructor(props){
        super(props)
        this.state = {
            sessionData : sessionStorage.getItem("token")
        }
       this.logoutSuccess = this.logoutSuccess.bind(this)
    }

   
    componentDidMount(){
        LogoutAction.logout(this.state.sessionData)
        LogoutStore.on("Logout_SUCCESS", this.logoutSuccess); 
    }

    componentDidUpdate(){
        LogoutStore.on("Logout_SUCCESS", this.logoutSuccess); 
    }

    componentWillUnmount(){
        LogoutStore.removeAllListeners("Logout_SUCCESS" ,this.logoutSuccess); 
    }


    logoutSuccess(){
        sessionStorage.clear()
        this.setState({sessionData : ''})
    }
    
   
    render(){
        if(sessionStorage.getItem("token")){
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
export default Logout

