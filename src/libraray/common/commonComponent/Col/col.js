import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

export default class Col extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="col-lg-6 col-md-6 col-sm-6">{children}</div>
        )
    }
}