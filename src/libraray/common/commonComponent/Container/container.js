import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Container extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="container" >{children}</div>
        )
    }
}