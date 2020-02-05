import React,{Component} from "react"
import Sidenav from '../commonComponent/sidenav/sidenav'


export default class RouteWrapper extends Component{    
    
    render(){  
        let {children} = this.props
        return(
        <div>
            <Sidenav/> 
            {children}
        </div>
        )
        
    }
}