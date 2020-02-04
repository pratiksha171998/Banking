import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Form extends Component {
    render(){
        return(
           <form onSubmit = {this.props.onSubmit}>{this.props.children}</form>
        )
    }
}