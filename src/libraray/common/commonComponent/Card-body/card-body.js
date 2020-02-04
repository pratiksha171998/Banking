import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class CardBody extends Component {
    render(){
        return(
           <div className="card-body">{this.props.children}</div>
        )
    }
}