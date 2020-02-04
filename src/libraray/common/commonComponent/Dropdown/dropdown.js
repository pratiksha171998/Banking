import React from 'react'
import  './dropdown.css'


export default function Dropdown(props){

    
        return(
            <div >
                <select onChange={props.handleChange} name = {props.name}>
                {props.options.map ((option,key)=>{
                    return(<option  key = {key} value={option.value} >{option.label}</option>)
                })}
                
                </select>
              
            </div>
        )
    
}