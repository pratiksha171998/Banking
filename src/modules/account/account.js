import React,{Component} from 'react'
import  '../../resources/style/style.css'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import InputField from '../../libraray/common/commonComponent/InputField/inputfield'
import * as CreateAction from '../../libraray/common/actions/accountAction'
import LoginStore from '../../libraray/common/Stores/loginStore'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import AccountStore from '../../libraray/common/Stores/accountStore'
import Button from '../../libraray/common/commonComponent/Button/button';
import SessionStore from '../../libraray/common/Stores/sessionStore'
import * as SessionAction from '../../libraray/common/actions/sessionStorageAction'
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
                <div>
                  
                <form style={{border: "none"}} onSubmit = {(e) => e.preventDefault()}>
                <div className="container-fluid">
                  <div className="card-account" >
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">First Name</span>
                      <InputField type="text"  name="firstName" 
                      placeholder = 'First Name'
                        updateStateProp = {this.createAccount}
                        value = {this.state.account.firstName} required  />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Last Name</span>
                      <InputField type="text"  name="lastName" 
                      placeholder = 'Last Name'
                        updateStateProp = {this.createAccount}
                        value = {this.state.account.lastName}/>
                      </div>
                  
                    </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Age</span>
                      <InputField type="text"  name="age"  updateStateProp = {this.createAccount}
                      placeholder = 'Age'
                      value = {this.state.account.age}/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Email Id</span>
                      <InputField type="email"  name="emailId" 
                      placeholder = 'Email Id'
                      updateStateProp = {this.createAccount}
                      value = {this.state.account.emailId} />
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Contact Number</span>
                      <InputField type="text"  name="mobileNumber" 
                      placeholder = 'Contact Number'
                    value = {this.state.account.mobileNumber} 
                    updateStateProp = {this.createAccount} required/>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Pan Card Number</span>
                      <InputField type="text"  name="panCardNo" 
                      placeholder = 'Pan Card Number'
                      required updateStateProp = {this.createAccount}
                        value = {this.state.account.panCardNo} />
                      </div>
                    </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Adhaar Card Number</span>
                      <InputField type="text"  name="adharCardNumber"
                      placeholder = 'Adhaar Card Number' 
                      value = {this.state.account.adharCardNumber} 
                      updateStateProp = {this.createAccount}
                      required/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Nationality</span>
                      <InputField type="text"  name="religion" 
                      placeholder = 'Nationality' 
                      value = {this.state.account.religion} 
                      updateStateProp = {this.createAccount} required/>
                      </div>
                      </div>
                      <div className="row">
                    
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Balance</span>
                      <InputField type="text"  name="balance" 
                      placeholder = 'Balance' 
                      updateStateProp = {this.createAccount}
                      value = {this.state.account.balance} 
                        required/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-10">
                      <span className="labelClass">Account Type</span>
                      <select className="selectClass" name="accountType" 
                    // disabled= {this.state.isReadOnly} 
                    value = {this.state.account.accountType} 
                    onChange = {this.createAccount} >
                        <option value="1">Saving</option>
                        <option value="0">Current</option>
                      </select>
                      </div>
                      </div>

                    
                      <Button className = "button-class" value = {this.state.button} onClick ={this.onClick}/>
                      
                  </div>
                </div>
            </form>

                </div>
            )
        }
    }