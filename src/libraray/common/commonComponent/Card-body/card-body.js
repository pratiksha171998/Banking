import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

 class CardBody extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="card-body">{children}</div>
        )
    }
}

export default CardBody 