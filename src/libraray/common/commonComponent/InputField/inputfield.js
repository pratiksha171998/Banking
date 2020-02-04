import React,{Component} from 'react'

export default class InputField extends Component{
    render(){
        return(
            <input pattern = {this.props.pattern} placeholder = {this.props.placeholder} type={this.props.type} autoComplete="off"  name = {this.props.name} onChange = {this.props.updateStateProp}
            defaultValue = {this.props.value}
            readOnly = {this.props.isReadOnly} 
            className ={this.props.className}></input>
        )
    }
}