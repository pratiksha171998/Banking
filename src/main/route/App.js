import React, { Component } from 'react';
import './App.css';
import Login from '../../modules/login/login'
import { BrowserRouter,Route,Switch} from 'react-router-dom'
import  Header  from '../../libraray/common/commonComponent/Header/header'
import Home from '../../modules/home/home'
import Transaction from '../../modules/transaction/transaction'
// import Sidenav from '../../libraray/common/commonComponent/sidenav/sidenav'
import Logout from '../../modules/logout/logout'
import ViewProfile from '../../modules/ViewProfile/view-profile'
import AccountList from '../../modules/account-list/account-list'
import CreateAccount  from '../../modules/account/account'
import RouteWrapper from '../../libraray/common/routingService/routeWrapper'

export default class App extends Component {

  constructor(){
    super()
    this.Home = this.Home.bind(this);
    this.Admin = this.Admin.bind(this);
  }


  viewbutton
  Home() {
    
    if(!sessionStorage.getItem("token")){
      this.button = <Route path='/login' component={Login} />
         
    }else{
      this.button =  <Route path='/logout' component={Logout} />
      this.viewbutton = <Route path='/view-profile' component={ViewProfile} />
    }
  return(
            <Switch>
                <Route exact path='/' component={Home} />
                {this.button}
                {this.viewbutton}
              </Switch>
  )}

  Admin(){
  return(
      <BrowserRouter>
        <RouteWrapper>
          <Switch>
                <Route path = '/account-list' component = {AccountList}/>
                <Route  path='/create-account' component={CreateAccount} />
                <Route  path='/edit-account/:id' component={CreateAccount} />
          </Switch>
        </RouteWrapper>
      </BrowserRouter>
  )
}
  
  render(){
    return (
      <div>
        <BrowserRouter>
        <Header/>   
        <Route exact path='/' children={this.Home}/>
                <Switch>
                    <Route path='/transaction' component={Transaction} />
                    <Route path='/account-list' children={this.Admin}/>
               </Switch>
          </BrowserRouter>
      </div>
    )
  }
 


}

