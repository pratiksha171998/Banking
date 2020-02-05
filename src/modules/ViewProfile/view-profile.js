import React,{Component} from 'react';
import LoginStore from '../../libraray/common/Stores/loginStore'
import '../../resources/style/style.css'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import Button from '../../libraray/common/commonComponent/Button/button';
import Form from '../../libraray/common/commonComponent/Form/form'
import {Input} from '../../libraray/common/commonComponent/AccountInputField/accountInputFields' 
import Span from '../../libraray/common/commonComponent/span/span'
import Col from '../../libraray/common/commonComponent/Col/col'
import Row from '../../libraray/common/commonComponent/Row/row'
import AccountCard from '../../libraray/common/commonComponent/Account-Card/account-card'

const button = "Back"
class ViewProfile extends Component{

    constructor(props){
        super(props)
        this.state = ({
            accountDetails : {},
            isReadOnly : "readOnly"
        })

        this.backClick = this.backClick.bind(this)
    }

    componentDidMount() {
      let callback = (data) =>this.apiResponse(data)
      this.allData = this.getUserApiCall(callback)
      this.setState({accountDetails : {}})
    }


    authenticateUser(){
      if(routingAuth.routingAuthForUser()){
        sessionStorage.clear()
        this.props.history.push('/login')
       }
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
        let {isReadOnly,accountDetails} = this.state
        if(!LoginStore.isLoggedIn()){
            this.props.history.push('/login')
        }
            return(
              <Form  onSubmit={this.onSubmit}>
                <AccountCard>
                   <Row>
                        <Input label = "First Name"  type="text" name="firstName" placeholder = "First Name"   isReadOnly ={isReadOnly}  value = {accountDetails.firstName} />
                        <Input label = "Last Name"  type="text" name="lastName" placeholder = "First Name"  isReadOnly ={isReadOnly}   value = {accountDetails.lastName} />
                  </Row>

                  <Row>
                      <Input  label = "Age"  type="text"  name="age" isReadOnly ={isReadOnly}
                      placeholder = 'Age' value = {accountDetails.age}/>
                      <Input  label = "Email Id" type="email"  name="emailId" placeholder = 'Email Id' isReadOnly ={isReadOnly} value = {accountDetails.emailId} />
                  </Row>

                  <Row>
                      <Input label = "Contact Number"  type="text"  name="mobileNumber" placeholder = 'Contact Number' value = {accountDetails.mobileNumber} isReadOnly ={isReadOnly} />
                      <Input  label = "Pan Card Number" type="text"  name="panCardNo" placeholder = 'Pan Card Number' isReadOnly ={isReadOnly} value = {accountDetails.panCardNo} />
                  </Row>

                  <Row>
                      <Input label = "Adhaar Card Number" type="text"  name="adharCardNumber" placeholder = 'Adhaar Card Number' value = {accountDetails.adharCardNumber} isReadOnly ={isReadOnly}/>
                      <Input  label = "Nationality" type="text"  name="religion"  placeholder = 'Nationality' 
                      value = {accountDetails.religion} isReadOnly ={isReadOnly} />
                  </Row>

                  <Row>
                      <Input label = "Balance" type="text"  name="balance"  placeholder = 'Balance' 
                      isReadOnly ={isReadOnly}  value = {accountDetails.balance} />


                      <Col>
                          <Span className="labelClass">Account Type</Span>
                          <select className="selectClass" name="accountType" 
                          disabled= {this.state.isReadOnly}
                          value = {accountDetails.accountType} >
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
export default ViewProfile

