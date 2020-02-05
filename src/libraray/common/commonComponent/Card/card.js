import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

class Card extends Component {
    render(){
        let {children} = this.props
        return(
           <div className = "card" >{children}</div>
        )
    }
}

export default Card 