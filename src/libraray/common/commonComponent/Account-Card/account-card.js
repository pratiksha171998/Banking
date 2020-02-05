import React ,{Component } from 'react';
import '../../../../resources/style/style.css'

class AccountCard extends Component {
    render(){
        let {children} = this.props
        return(
           <div className="card-account">{children}</div>
        )
    }
}

export default AccountCard 