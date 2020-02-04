import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Row extends Component {
    render(){
        return(
           <div className="row">{this.props.children}</div>
        )
    }
}