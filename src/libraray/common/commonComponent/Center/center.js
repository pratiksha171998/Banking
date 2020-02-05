import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

 class Center extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="center">{children}</div>
        )
    }
}

export default Center