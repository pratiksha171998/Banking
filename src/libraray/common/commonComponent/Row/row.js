import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Row extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="row">{children}</div>
        )
    }
}