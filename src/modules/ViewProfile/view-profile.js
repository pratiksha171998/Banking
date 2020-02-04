import React,{Component} from 'react';
import LoginStore from '../../libraray/common/Stores/loginStore'
import InputField from '../../libraray/common//commonComponent/InputField/inputfield'
import '../../resources/style/style.css'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import Button from '../../libraray/common/commonComponent/Button/button';

const button = "Back"
export default class ViewProfile extends Component{
    

    constructor(props){
        super(props)
        this.state = ({
            accountDetails : {},
            isReadOnly : "readOnly"
        })

        this.backClick = this.backClick.bind(this)
    }



    componentDidMount() {
      if(routingAuth.routingAuthForUser()){
        sessionStorage.clear()
        this.props.history.push('/login')
       }
      let callback = (data) =>this.apiResponse(data)
      this.allData = this.getUserApiCall(callback)
      this.setState({
        accountDetails : {},
      },()=>{
        console.log(this.state ,"----State")
      })
    }

    apiResponse(data){
      console.log("Api respnse" ,data)
      this.setState({
        accountDetails : data.data.response
      },()=>{
        console.log(this.state,"State")
      })
    }

    backClick(){
        this.props.history.goBack()
    }
    getUserApiCall(callback){ 
      const to =  sessionStorage.getItem("token")
      if(to){ 
      apiUtil.apiUtilGet(`/user/viewDetails`)
          .then(function (res){
            callback(res)
              console.log("Get DOne",res)
          }).catch(err => {
              console.log("Error",err)
          })
    }
    }
   
    render(){ 
        if(!LoginStore.isLoggedIn()){
            this.props.history.push('/login')
        }
        
            return(
                <form style={{border: "none"}} onSubmit={this.onSubmit}>
                <div className="container-fluid">
                  <div className="card-account" >
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">First Name</span>
                      <InputField type="text"  name="firstName" 
                      value = {this.state.accountDetails.firstName}
                        isReadOnly ={this.state.isReadOnly}
                        
                        required  />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Last Name</span>
                      <InputField type="text"  name="lastName" 
                        value = {this.state.accountDetails.lastName}
                        isReadOnly ={this.state.isReadOnly}
                        required />
                      </div>
                  
                    </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Age</span>
                      <InputField type="text"  name="age" 
                        value = {this.state.accountDetails.age}
                        isReadOnly ={this.state.isReadOnly}
                        required/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Email Id</span>
                      <InputField type="email"  name="emailId" 
                      value = {this.state.accountDetails.emailId}
                        isReadOnly ={this.state.isReadOnly}
                        required/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Contact Number</span>
                      <InputField type="text"  name="mobileNumber" 
                      isReadOnly ={this.state.isReadOnly}
                      
                      value = {this.state.accountDetails.mobileNumber}
                        required/>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Pan Card Number</span>
                      <InputField type="text"  name="panCardNo" 
                      isReadOnly ={this.state.isReadOnly}
                      value = {this.state.accountDetails.panCardNo}
                        required />
                      </div>
                    </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Adhaar Card Number</span>
                      <InputField type="text"  name="adharCardNumber" 
                      isReadOnly ={this.state.isReadOnly}
                      value = {this.state.accountDetails.adharCardNumber}
                        required/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Nationality</span>
                      <InputField type="text"  name="religion" 
                      value = {this.state.accountDetails.religion}
                        isReadOnly ={this.state.isReadOnly}
                        required/>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Balance</span>
                      <InputField type="text"  name="religion" 
                      value = {this.state.accountDetails.balance}
                        isReadOnly ={this.state.isReadOnly}
                        required/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                      <span className="labelClass">Account Type</span>
                      <select className="selectClass" name="accountType" 
                      disabled= {this.state.isReadOnly}
                      value = {this.state.accountDetails.accountType} >
                        <option value="1">Saving</option>
                        <option value="0">Current</option>
                      </select>
                      </div>
                      
                      </div>
                      <Button className = "button-class" value = {button}  onClick ={this.backClick}/>
                  </div>
                </div>
            </form>
          
            )
          
        }
    }

