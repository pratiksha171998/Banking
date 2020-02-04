import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Container extends Component {
    render(){
        return(
           <div className="container" >{this.props.children}</div>
        )
    }
}