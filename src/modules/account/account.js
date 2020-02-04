import React,{Component} from 'react'
import  '../../resources/style/style.css'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import InputField from '../../libraray/common/commonComponent/InputField/inputfield'
import * as CreateAction from '../../libraray/common/actions/accountAction'
import LoginStore from '../../libraray/common/Stores/loginStore'
import Span from '../../libraray/common/commonComponent/span/span'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import AccountStore from '../../libraray/common/Stores/accountStore'
import Button from '../../libraray/common/commonComponent/Button/button';
import SessionStore from '../../libraray/common/Stores/sessionStore'
import AccountCard from '../../libraray/common/commonComponent/Account-Card/account-card'
import * as SessionAction from '../../libraray/common/actions/sessionStorageAction'
import Form from '../../libraray/common/commonComponent/Form/form'
import Col from '../../libraray/common/commonComponent/Col/col'
import Row from '../../libraray/common/commonComponent/Row/row'
// import * as Validation from '../../libraray/common/Validation/validation'

export default class CreateAccount extends Component{

  constructor(props){
    super(props)
    this.state = ({
        account : {},
        button : ''
        
    })
    this.createAccount = this.createAccount.bind(this);
    this.onClick = this.onClick.bind(this);
    this.sessionSuccess = this.sessionSuccess.bind(this);
  }

    componentDidMount() {
      console.log(!routingAuth.routingAuthForUser())
      if(!routingAuth.routingAuthForUser()){
        SessionAction.sessionClearAction()
        SessionStore.on("SESSION_SUCCESS",this.sessionSuccess)
        console.log("++++++INSIDE ACOOUNT LIST")
        this.props.history.push('/login')
      }
      console.log(this.props,"=======")
      AccountStore.on("Account_SUCCESS", this.accountSuccess);
      if(this.props.location.state.route){
        this.currentURL = this.props.location.state.route
        console.log(this.currentURL)
      }
      this.userId =this.props.match.params.id ? this.props.match.params.id : ''
      switch(this.currentURL){
        case 'create-account' : {
          this.setState({
            account : {},
            button : "CREATE"
          })
          break;
        }
        case 'edit-account' : {
        
          let callback = (data) =>this.apiResponse(data)
          this.allData = this.getUserApiCall(this.userId,callback)
          this.setState({
            account : {},
            button : "EDIT",

          },()=>{
            console.log(this.state ,"----State")
          })
          break;
        }
        default : {

        }
      }

    
    }


    sessionSuccess(){
      this.props.history.push('/login')
    }


    apiResponse(data){
      console.log("Api respnse" ,data)
      this.setState({
        account : data.data.response
      },()=>{
        console.log(this.state,"State")
      })
    }


    getUserApiCall(id,callback){ 
      const to =  sessionStorage.getItem("token")
      if(to){ 
    apiUtil.apiUtilPost(`/admin/userById`,{
        _id : id
      })
          .then(function (res){
            callback(res)
              console.log("Get DOne",res)
          }).catch(err => {
              console.log("Error",err)
          })
    }
    }


    accountSuccess(){
      console.log("HELlo")
      }
      createAccount(event){
        const {account} = this.state,
        // {name,value} = event.target
        {target:{name = "",value = ""}={}}=event
        account[name] = value;
        this.setState({ 
          account
          },()=>{
              console.log(this.state.account)
          })
    }


    onClick(){   
      switch(this.currentURL){
        case 'create-account' : {
          console.log("Save CAll")
          CreateAction.careateAccountAction(this.state.account)
          this.props.history.push('/account-list')
          break;
        }
        case 'edit-account' : {
          console.log("Edit CAll")
          CreateAction.updateAccountAction(this.state.account,this.userId)
          this.props.history.push('/account-list')
          break
        }
        default : {

        }
      }
    }

        render(){
          // console.log(this.props.location)
          // console.log(this.props.match.params.id)
          
            if(!LoginStore.isLoggedIn()){
                this.props.history.push('/login')
            }
            return(
                
                  
                <Form onSubmit = {(e) => e.preventDefault()}>
                  <AccountCard>
                   <Row>
                      <Col>
                      <Span className="labelClass">First Name</Span>
                      <InputField type="text"  name="firstName" 
                      placeholder = 'First Name'
                      updateStateProp = {this.createAccount}
                      value = {this.state.account.firstName} required  />
                      </Col>
                      <Col>
                      <Span className="labelClass">Last Name</Span>
                      <InputField type="text"  name="lastName" 
                      placeholder = 'Last Name'
                      updateStateProp = {this.createAccount}
                      value = {this.state.account.lastName}/>
                       </Col>
                      </Row>

                      <Row>
                      <Col>
                      <Span className="labelClass">Age</Span>
                      <InputField type="text"  name="age"  updateStateProp = {this.createAccount}
                      placeholder = 'Age'
                      value = {this.state.account.age}/>
                      </Col>
                      <Col>
                      <Span className="labelClass">Email Id</Span>
                      <InputField type="email"  name="emailId" 
                      placeholder = 'Email Id'
                      updateStateProp = {this.createAccount}
                      value = {this.state.account.emailId} />
                      </Col>
                      </Row>

                      <Row>
                      <Col>
                      <Span className="labelClass">Contact Number</Span>
                      <InputField type="text"  name="mobileNumber" 
                      placeholder = 'Contact Number'
                      value = {this.state.account.mobileNumber} 
                      updateStateProp = {this.createAccount} required/>
                      </Col>
                      <Col>
                      <Span className="labelClass">Pan Card Number</Span>
                      <InputField type="text"  name="panCardNo" 
                      placeholder = 'Pan Card Number'
                      required updateStateProp = {this.createAccount}
                      value = {this.state.account.panCardNo} />
                      </Col>
                      </Row>

                      <Row>
                      <Col>
                      <Span className="labelClass">Adhaar Card Number</Span>
                      <InputField type="text"  name="adharCardNumber"
                      placeholder = 'Adhaar Card Number' 
                      value = {this.state.account.adharCardNumber} 
                      updateStateProp = {this.createAccount}
                      required/>
                      </Col>
                      <Col>
                      <Span className="labelClass">Nationality</Span>
                      <InputField type="text"  name="religion" 
                      placeholder = 'Nationality' 
                      value = {this.state.account.religion} 
                      updateStateProp = {this.createAccount} required/>
                      </Col>
                      </Row>

                      <Row>
                      <Col>
                      <Span className="labelClass">Balance</Span>
                      <InputField type="text"  name="balance" 
                      placeholder = 'Balance' 
                      updateStateProp = {this.createAccount}
                      value = {this.state.account.balance} 
                      required/>
                      </Col>
                      <Col>
                      <Span className="labelClass">Account Type</Span>
                      <select className="selectClass" name="accountType" 
                      value = {this.state.account.accountType} 
                      onChange = {this.createAccount} >
                      <option value="1">Saving</option>
                      <option value="0">Current</option>
                      </select>
                      </Col>
                      </Row>
                      <Button className = "button-class" value = {this.state.button} onClick ={this.onClick}/>
                      </AccountCard>
               
                </Form>

                
            )
        }
    }