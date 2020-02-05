import React,{Component} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../../resources/style/style.css';
import Card from '../../libraray/common/commonComponent/Card/card'
import Center from '../../libraray/common/commonComponent/Center/center'
import CardHeader from '../../libraray/common/commonComponent/Card-header/card-header'
import CardBody from '../../libraray/common/commonComponent/Card-body/card-body'
import H1Header from '../../libraray/common/commonComponent/h1-header/h1-header'
import Span from '../../libraray/common/commonComponent/span/span'
import Container from '../../libraray/common/commonComponent/Container/container'
import Form from '../../libraray/common/commonComponent/Form/form'
import loginStore from '../../libraray/common/Stores/loginStore'
import  * as LoginAction from '../../libraray/common/actions/loginAction'
import InputField  from '../../libraray/common/commonComponent/InputField/inputfield'
import Button from '../../libraray/common/commonComponent/Button/button'
import * as Validation from '../../libraray/common/Validation/validation'

 
const button = 'Login'
class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            loginDetails : {}, 
            isLoggedIn : false, 
            error : {} 
        }
        this.onLogin = this.onLogin.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
   
    componentDidMount() {
        loginStore.on("Login_SUCCESS", this.loginSuccess); 
    }


    componentDidUpdate(){
        loginStore.on("Login_SUCCESS", this.loginSuccess); 
    }


    componentWillUnmount() {
        loginStore.removeAllListeners("Login_SUCCESS" ,this.loginSuccess); 
    }


    loginSuccess(){
        this.setState({isLoggedIn: true},()=>{
            if(sessionStorage.getItem('token')){
                if(loginStore.enteredData.isAdmin){
                    this.props.history.push('/account-list')  
                }else{
                    this.props.history.push('/transaction')  
                }
            }
        });
    };
   
    

    onLogin(event) {
        const loginDetails = this.state.loginDetails,
        {target:{name = "",value = ""}={}}=event
        loginDetails[name] = value;
        const error  = Validation.isValid(loginDetails)
        let errMessage = error.error
        if(!error.formIsValid){
            this.setState({ 
                loginDetails,
                error :errMessage
            })
        }else{
            this.setState({ 
                loginDetails,
                error :{}
            })
        }   
    }



    loginSubmit() { 
        LoginAction.loginDataAction(this.state.loginDetails)
    };


    render(){
        let {error} = this.state
        return(
            <Container>
                <Card>
                    <Center>
                        <CardHeader>
                            <H1Header>
                                Login
                            </H1Header>
                        </CardHeader>
                            <CardBody>
                                <Form>
                                    <div>
                                        <Span className = "labelClass">
                                            Username
                                        </Span>
                                        <InputField  name = 'emailId' placeholder="Email" type = 'text' onChange = {this.onLogin} />
                                        {error.emailId !== ''  && <Span className = "error-color">{error.emailId}</Span>}
                                    </div>
                                    <div>
                                        <Span className = "labelClass">
                                            Password
                                        </Span>
                                        <InputField  name = 'password'  placeholder="Password" type = 'password' onChange = {this.onLogin} />
                                        {error.password !== ''  && <Span className = "error-color">{error.password}</Span>}
                                    </div>
                                    <div>
                                        <Button  className = 'button-class' value = {button} onClick ={this.loginSubmit} />
                                    </div>
                                </Form>
                            </CardBody>
                    </Center>
                </Card>
           </Container>
        )
    }
}

export default Login

        // let loginDetails = this.state.loginDetails;
        // let error = {};
        // let formIsValid = true;

        // if(!loginDetails["emailId"]){
        //     formIsValid = false;
        //     error["emailId"] = "Cannot be empty";
        //  }
        //  if(!loginDetails["password"]){
        //     formIsValid = false;
        //     error["password"] = "Password Cannot be empty";
        //  }

        //  this.setState({error: error});
        //  console.log(error)
        //  return formIsValid;