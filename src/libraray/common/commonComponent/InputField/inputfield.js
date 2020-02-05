import React,{Component} from 'react'

export default class InputField extends Component{
    render(){
        let {placeholder,type,name,onChange,value,isReadOnly,className} = this.props
        return(
                <input placeholder = {placeholder} type={type}    autoComplete="off"  name = {name} 
                    onChange = {onChange}
                    defaultValue = {value}
                    readOnly = {isReadOnly} 
                    className ={className}>
                </input>
        )
    }
}