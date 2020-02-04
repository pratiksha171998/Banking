import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Col extends Component {
    render(){
        return(
           <div className="col-lg-6 col-md-6 col-sm-6">{this.props.children}</div>
        )
    }
}