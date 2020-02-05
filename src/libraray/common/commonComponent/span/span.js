import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Span extends Component {
    render(){
        let {className,children} = this.props
        return(
            <span className = {className} >{children}</span>
        )
    }
}