import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class AccountCard extends Component {
    render(){
        return(
           <div className="card-account">{this.props.children}</div>
        )
    }
}