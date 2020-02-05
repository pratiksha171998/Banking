import React,{Component} from 'react'
import  '../../resources/style/style.css'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import Modal from '../../libraray/common/commonComponent/commonModel/commonModel'
import InputField from '../../libraray/common/commonComponent/InputField/inputfield'
import loginStore from '../../libraray/common/Stores/loginStore';
import SessionStore from '../../libraray/common/Stores/sessionStore'
import * as SessionAction from '../../libraray/common/actions/sessionStorageAction'
import Button from '../../libraray/common/commonComponent/Button/button';

// const value =['1','2']
// const option = [{value: 3,name : 'Select'},{value: 0,name : 'Deposit'},{value: 1,label : 'Withdrawal'}]
// const optionForCardType = [{value: 3,name : 'Select'},{value: 0,name : 'VISA/Master Card'},{value: 1,label : 'Debit Card'}]

const Depositbtn = "Deposit",
      Withdrawalbtn = "Withdrawal"
      ,userHeader = [
        "S.No","Transaction Id","Transaction Amount","Credit/Debit","Total Balance"
    ]

class Transaction extends Component{
    
    constructor(props){
        super(props)
        this.state = ({
            userData : [],
            buttonDeposit : "Deposit",
            buttonWithdrawal : "Withdrawal",
            isShowing : false,
            isCredit : 1,
            amount : ''

        })
        this.amountEvent = this.amountEvent.bind(this);
        this.openModalDeposit = this.openModalDeposit.bind(this);
        this.openModalWithdrawal = this.openModalWithdrawal.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.apiCall = this.apiCall.bind(this);
        this.sessionSuccess = this.sessionSuccess.bind(this);
    }



    componentDidMount() {
        SessionStore.on("SESSION_SUCCESS",this.sessionSuccess)
        this.getTransactionHistory()
    }

    componentWillUnmount(){
        SessionStore.removeAllListeners("SESSION_SUCCESS", this.sessionSuccess); 
    }


    componentDidUpdate(){
        SessionStore.on("SESSION_SUCCESS", this.sessionSuccess); 
    }

    sessionSuccess(){
        console.log("Success Emit")
    }

    authenticateUser(){
        if(routingAuth.routingAuthForUser()){
            SessionAction.sessionClearAction()
            this.props.history.push('/login')
        }
    }
   

    openModalDeposit() {
      this.setState({
          isShowing: true,
          isCredit : 1
      });
    }


    getTransactionHistory(){
        const to =  sessionStorage.getItem("token")
        if(to){
            apiUtil.apiUtilGet(`/user/transactionhistory`)
            .then(res => {
                
                var allTransaction = res.data.response
                this.setState({userData:allTransaction});
            }).catch(err => {
                console.log(err)
            })
        }
    }


    openModalWithdrawal(){
        this.setState({
            isShowing: true,
            isCredit : 0
        });
    }


    closeModalHandler() {
      this.setState({
          isShowing: false
       });
    }


    apiCall(){
        let {amount,isCredit} = this.state
        const to =  sessionStorage.getItem("token")
        if(to){
            apiUtil.apiUtilPost(`/user/transaction`,{amount,isCredit})
            .then(res => {
                let {userData = []} = this.state;
                let value = res.data.response;
                userData.push(value);
                this.setState({userData : userData}); 
                this.closeModalHandler()
                console.log("res--->", userData);
            }).catch(err => {
                console.log("Error",err)
                alert(err.message) 
            })
        }
    }


    amountEvent(event) {
        const {value} = event.target
        this.setState({amount : value})
    }
    
    renderTableHeader() {
        // let header = Object.keys(this.state.students[0])
        return userHeader.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }


    render(){
            if(!loginStore.isLoggedIn()){
                this.props.history.push('/login')
            }
            const container = document.createElement("div");
            document.body.appendChild(container);
            let {userData = []}= this.state;

           

            console.log(this.renderTableHeader(),"d")



            return(
                <div>
                    <div>
                        { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                            <Button className="open-modal-btn" onClick={this.openModalDeposit} value = {Depositbtn}/>
                            <Button className="open-modal-btn" onClick={this.openModalWithdrawal} value = {Withdrawalbtn} />

                        { 
                            this.state.isShowing && 
                            <Modal
                                className="modal"
                                show={this.state.isShowing}
                                close={this.closeModalHandler}
                                call =  {this.apiCall }>
                                {this.state.isCredit ? <span className = "color-alpha" >Deposit Amount</span>: <span className = "color-alpha" >Withdrawal Amount</span> }
                                <InputField pattern="[0-9]*" name = 'amount' placeholder="Amount" type = 'text' onChange = {this.amountEvent} />
                            </Modal>
                        }
                    </div>

                    <form onSubmit = {(e) => e.preventDefault()}>
                        <table className = 'tablespace'>
                                <thead>
                                    <tr>
                                    <th>S.No</th>
                                    <th>Transaction Id</th>
                                    <th>Transaction Amount</th>
                                    <th>Credit/Debit</th>
                                    <th>Total Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    userData && userData.map(({_id,amount,isCredit,balance},key) =>
                                    <tr key ={_id}>
                                    <td>{key+1}</td>
                                    <td>{_id}</td>
                                    <td>{amount}</td>
                                    <td>{isCredit ? 'Deposit':'Withdrawal'}</td>
                                    <td>{balance}</td>  
                                    </tr>
                                    )} 
                                </tbody>
                        </table>
                    </form>
                </div>
            )
        }
}
export default Transaction

