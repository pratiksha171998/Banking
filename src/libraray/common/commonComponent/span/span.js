import React ,{Component } from 'react';
import '../../../../resources/style/style.css'
import { throwStatement } from '@babel/types';

export default class Span extends Component {
    render(){
        return(
            <span className = {this.props.className} >{this.props.children}</span>
        )
    }
}