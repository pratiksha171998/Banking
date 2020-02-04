import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class H1Header extends Component {
    render(){
        return(
           <h1>{this.props.children}</h1>
        )
    }
}