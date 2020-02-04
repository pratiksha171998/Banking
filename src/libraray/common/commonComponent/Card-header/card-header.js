import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class CardHeader extends Component {
    render(){
        return(
           <div className="card-header">{this.props.children}</div>
        )
    }
}