import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class H1Header extends Component {
    render(){
        let {children} = this.props
        return(
           <h1>{children}</h1>
        )
    }
}