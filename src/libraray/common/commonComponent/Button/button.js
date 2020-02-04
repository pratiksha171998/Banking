import React,{Component} from 'react'


export default class Button extends Component{
    render(){
        return(
            <button className = {this.props.className} type = 'button' onClick = {this.props.onClick}>{this.props.value}</button>
        )
    }
}