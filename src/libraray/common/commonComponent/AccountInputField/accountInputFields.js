
import Col from '../Col/col'
import React from 'react'
import InputField from '../InputField/inputfield'
import '../../../../resources/style/style.css'



const Input = (props) => {
   let {label,type,name,placeholder,onChange,value,isReadOnly} = props
    return(
        <Col>
                <span className="labelClass">{label}</span>
                <InputField type= {type}  name={name} 
                            placeholder = {placeholder}
                            onChange = {onChange}
                            value = {value}
                            isReadOnly = {isReadOnly}/>
        </Col>
    )
              
}
export {Input}