import React,{Component} from 'react'
import InputField  from '../../libraray/common/commonComponent/InputField/inputfield'
import Button from '../../libraray/common/commonComponent/Button/button'
import  * as SignupAction from '../../libraray/common/actions/commonAction'
import signupStore from '../../libraray/common/Stores/signupStore'
import { Link} from 'react-router-dom'
import Validation from '../../libraray/common/commonComponent/validation'



const button = 'Sign Up',
export default class Signup extends Component{
    constructor(props){
        super(props)
        this.state = ({ 
            allData : '',
            signUpFields : {},
            error : {}
        })
        this.signupSubmit = this.signupSubmit.bind(this);
        this.signupEvent = this.signupEvent.bind(this);
        this.getAllSignupData = this.getAllSignupData.bind(this);
    }
    signupEvent(event) {
        const {signUpFields} = this.state,
        {target:{name = "",value = ""}={}}=event
        signUpFields[name] = value;
        this.setState({
            signUpFields
        });
    }
    signupSubmit() {
        SignupAction.signupDataAction(this.state.signUpFields)
    };
    componentDidMount() {
        signupStore.on("Signup", this.getAllSignupData);  
    }
    componentWillUnmount() {
        signupStore.removeListener("Signup",this.getAllSignupData);
    }

    getAllSignupData() {
        this.setState({allData: signupStore.getSignupData()})
    };
    render(){
        
        return(
            <div>
                <Link to="/"></Link>
                
                <form onSubmit = {(e)=>{e.preventDefault()}}>
                <h1>
                    Signup
                </h1>
                <div>
                    Name
                </div>
                <InputField  name = 'username' type = 'text' updateStateProp = {this.signupEvent} />
                <div>
                    Address
                </div>
                {/* <input type = 'text' name = "address"  onChange={this.signupEvent}></input> */}
                <InputField name = 'address'  type = 'text' updateStateProp = {this.signupEvent}/>
                <div>
                    Email
                </div>
                <InputField  name = 'email' type = 'text' updateStateProp = {this.signupEvent}/>
                <div>
                    Password
                </div>
                <InputField name = 'password'  type = 'password' updateStateProp = {this.signupEvent} />

                <div>
                    <Button  value = {button} onClick ={this.signupSubmit} />
                </div>
                
                </form>
                
                
            </div>
        )
    }
}