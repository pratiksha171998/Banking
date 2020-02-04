import React,{Component} from "react"
import Sidenav from '../commonComponent/sidenav/sidenav'


export default class RouteWrapper extends Component{    


    render(){  
        return(
        <div>
        <Sidenav/> 
        {this.props.children}
        </div>
        )
        
    }
}