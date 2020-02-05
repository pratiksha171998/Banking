import React,{Component} from 'react'


class Button extends Component{
    render(){
        let {className,onClick,value} = this.props
        return(
            <button className = {className} type = 'button' onClick = {onClick}>{value}</button>
        )
    }
}
export default Button