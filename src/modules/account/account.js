import React,{Component} from 'react'
import  '../../resources/style/style.css'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import * as CreateAction from '../../libraray/common/actions/accountAction'
import LoginStore from '../../libraray/common/Stores/loginStore'
import Span from '../../libraray/common/commonComponent/span/span'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import AccountStore from '../../libraray/common/Stores/accountStore'
import {Input} from '../../libraray/common/commonComponent/AccountInputField/accountInputFields'
import Button from '../../libraray/common/commonComponent/Button/button';
import SessionStore from '../../libraray/common/Stores/sessionStore'
import AccountCard from '../../libraray/common/commonComponent/Account-Card/account-card'
import * as SessionAction from '../../libraray/common/actions/sessionStorageAction'
import Form from '../../libraray/common/commonComponent/Form/form'
import Col from '../../libraray/common/commonComponent/Col/col'
import Row from '../../libraray/common/commonComponent/Row/row'


class CreateAccount extends Component{

  constructor(props){
    super(props)
    this.state = {
        account : {},
        button : '',
        cancelButton : ''
    }

    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onClick = this.onClick.bind(this);
    this.sessionSuccess = this.sessionSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.authenticateUser()
    AccountStore.on("Account_SUCCESS", this.accountSuccess);
    this.conditionForCreateEdit()
  }


  componentWillUnmount(){
    AccountStore.removeAllListeners("Account_SUCCESS", this.accountSuccess); 
  }


  componentDidUpdate(){
    AccountStore.on("Account_SUCCESS", this.accountSuccess); 
  }

  
  authenticateUser(){
    if(!routingAuth.routingAuthForUser()){
      SessionAction.sessionClearAction()
      SessionStore.on("SESSION_SUCCESS",this.sessionSuccess)
      this.props.history.push('/login')
    }
  }


  conditionForCreateEdit(){
    let {route} = this.props.location.state
    let {id} = this.props.match.params.id
    if(route){
      this.currentURL = route
    }
    this.userId = id ? id : ''
    switch(this.currentURL){
      case 'create-account' : {
        this.setState({
          account : {},
          button : "CREATE",
          cancelButton : 'CANCEL'
        })
        break;
      }
      case 'edit-account' : {
        let callback = (data) =>this.apiResponse(data)
        this.allData = this.getUserApiCall(this.userId,callback)
        this.setState({
          account : {},
          button : "EDIT",
          cancelButton : 'BACK'
        })
        break;
      }
      default : {}
    }
  }
    

  sessionSuccess(){
    this.props.history.push('/login')
  }

  onCancel(){
    this.props.history.goBack()
  }


  apiResponse({data}){
    this.setState({
      account : data.response
    })
  }


  getUserApiCall(_id,callback){ 
    const to =  sessionStorage.getItem("token")
      if(to){ 
        apiUtil.apiUtilPost(`/admin/userById`,{_id})
            .then(function (res){
              callback(res)
                console.log("Get DOne",res)
            }).catch(err => {
                console.log("Error",err)
        })
    }
  }


  accountSuccess(){
    console.log("HELlo ji account Succes")
  }


  onCreateAccount(event){
    const {account} = this.state,
    {target:{name = "",value = ""}={}}=event
    account[name] = value;
    this.setState({account})
  }


  onClick(){   
    switch(this.currentURL){
      case 'create-account' : {
        CreateAction.careateAccountAction(this.state.account)
        this.props.history.push('/account-list')
        break;
      }
      case 'edit-account' : {
        CreateAction.updateAccountAction(this.state.account,this.userId)
        this.props.history.push('/account-list')
        break
      }
      default : {}
    }
  }

  render(){
          let {account,button,cancelButton} = this.state
          if(!LoginStore.isLoggedIn()){
              this.props.history.push('/login')
          }
    return(
            <Form onSubmit = {(e) => e.preventDefault()}>
              <AccountCard>
                  <Row>

                        <Input label = "First Name"  type="text" name="firstName" placeholder = "First Name" onChange = {this.onCreateAccount}   value = {account.firstName} />
                        <Input label = "Last Name"  type="text" name="lastName" placeholder = "First Name" onChange = {this.onCreateAccount}   value = {account.lastName} />  

                     
                  </Row>
                  <Row>
                    
                      <Input  label = "Age"  type="text"  name="age"  onChange = {this.onCreateAccount}
                      placeholder = 'Age' value = {account.age}/>
                      <Input  label = "Email Id" type="email"  name="emailId" placeholder = 'Email Id' onChange = {this.onCreateAccount} value = {account.emailId} />
                     
                  </Row>
                  <Row>
                     
                      <Input label = "Contact Number"  type="text"  name="mobileNumber" placeholder = 'Contact Number' value = {account.mobileNumber} onChange = {this.onCreateAccount} />
                      <Input  label = "Pan Card Number" type="text"  name="panCardNo" placeholder = 'Pan Card Number' onChange = {this.onCreateAccount} value = {account.panCardNo} />
                    
                  </Row>
                  <Row>
                      
                      <Input label = "Adhaar Card Number" type="text"  name="adharCardNumber" placeholder = 'Adhaar Card Number' value = {account.adharCardNumber} onChange ={this.onCreateAccount} />
                      <Input  label = "Nationality" type="text"  name="religion"  placeholder = 'Nationality' 
                      value = {account.religion} onChange = {this.onCreateAccount} />
                  
                  </Row>
                  <Row>
                   
                      <Input label = "Balance" type="text"  name="balance"  placeholder = 'Balance' 
                      onChange = {this.onCreateAccount} value = {account.balance} />
                      <Col>
                            <Span 
                                 className="labelClass">Account Type
                            </Span>
                            <select className="selectClass" name="accountType" 
                            value = {account.accountType} 
                            onChange = {this.onCreateAccount} >
                            <option value="1">Saving</option>
                            <option value="0">Current</option>
                            </select>
                      </Col>

                  </Row>

                      <Button className = "button-class" value = {button} onClick ={this.onClick}/>
                      <Button className = "button-class" value = {cancelButton} onClick ={this.onCancel}/>

              </AccountCard>
            </Form>  
        )
    }
}

export default CreateAccount