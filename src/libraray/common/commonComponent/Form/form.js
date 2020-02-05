import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Form extends Component {
    render(){
        let {children,onSubmit} = this.props
        return(
           <form onSubmit = {onSubmit}>{children}</form>
        )
    }
}