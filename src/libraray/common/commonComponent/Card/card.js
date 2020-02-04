import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Card extends Component {
    render(){
        return(
           <div className = "card" >{this.props.children}</div>
        )
    }
}