import React,{Component} from 'react';
import LoginStore from '../../libraray/common/Stores/loginStore'
import InputField from '../../libraray/common//commonComponent/InputField/inputfield'
import '../../resources/style/style.css'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import Button from '../../libraray/common/commonComponent/Button/button';
import Form from '../../libraray/common/commonComponent/Form/form'
import Span from '../../libraray/common/commonComponent/span/span'
import Col from '../../libraray/common/commonComponent/Col/col'
import Row from '../../libraray/common/commonComponent/Row/row'
import AccountCard from '../../libraray/common/commonComponent/Account-Card/account-card'

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
                <Form  onSubmit={this.onSubmit}>
                <AccountCard>
                   <Row>
                    <Col>
                    <Span className="labelClass">First Name</Span>
                    <InputField type="text"  name="firstName" 
                    value = {this.state.accountDetails.firstName}
                    isReadOnly ={this.state.isReadOnly}
                    required  />
                   </Col>
                    <Col>
                    <Span className="labelClass">Last Name</Span>
                    <InputField type="text"  name="lastName" 
                    value = {this.state.accountDetails.lastName}
                    isReadOnly ={this.state.isReadOnly}
                    required />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
                    <Span className="labelClass">Age</Span>
                    <InputField type="text"  name="age" 
                    value = {this.state.accountDetails.age}
                    isReadOnly ={this.state.isReadOnly}
                    required/>
                    </Col>
                    <Col>
                    <Span className="labelClass">Email Id</Span>
                    <InputField type="email"  name="emailId" 
                    value = {this.state.accountDetails.emailId}
                    isReadOnly ={this.state.isReadOnly}
                    required/>
                    </Col>
                    </Row>

                    <Row>
                    <Col>
                    <Span className="labelClass">Contact Number</Span>
                    <InputField type="text"  name="mobileNumber" 
                    isReadOnly ={this.state.isReadOnly}
                    value = {this.state.accountDetails.mobileNumber}
                    required/>
                    </Col>
                    <Col>
                    <Span className="labelClass">Pan Card Number</Span>
                    <InputField type="text"  name="panCardNo" 
                    isReadOnly ={this.state.isReadOnly}
                    value = {this.state.accountDetails.panCardNo}
                    required />
                    </Col>
                    </Row>

                    <Row>
                    <Col>
                    <Span className="labelClass">Adhaar Card Number</Span>
                    <InputField type="text"  name="adharCardNumber" 
                    isReadOnly ={this.state.isReadOnly}
                    value = {this.state.accountDetails.adharCardNumber}
                    required/>
                    </Col>
                    <Col>
                    <Span className="labelClass">Nationality</Span>
                    <InputField type="text"  name="religion" 
                    value = {this.state.accountDetails.religion}
                    isReadOnly ={this.state.isReadOnly}
                    required/>
                    </Col>
                    </Row>

                    <Row>
                    <Col>
                    <Span className="labelClass">Balance</Span>
                    <InputField type="text"  name="religion" 
                    value = {this.state.accountDetails.balance}
                    isReadOnly ={this.state.isReadOnly}
                    required/>
                    </Col>
                    <Col>
                    <Span className="labelClass">Account Type</Span>
                    <select className="selectClass" name="accountType" 
                    disabled= {this.state.isReadOnly}
                    value = {this.state.accountDetails.accountType} >
                    <option value="1">Saving</option>
                    <option value="0">Current</option>
                    </select>
                    </Col>
                    </Row>

                      <Button className = "button-class" value = {button}  onClick ={this.backClick}/>
                    </AccountCard>
                
            </Form>
          
            )
          
        }
    }

