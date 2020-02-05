import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

class CardHeader extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="card-header">{children}</div>
        )
    }
}
export default  CardHeader 