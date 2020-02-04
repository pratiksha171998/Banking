import React, { Component } from 'react';
import * as apiUtil from '../../libraray/common/apiCall/apiUtilities'
import '../../resources/style/style.css'
import Button from '../../libraray/common/commonComponent/Button/button';
import LoginStore from '../../libraray/common/Stores/loginStore'
import * as routingAuth from '../../libraray/common/routingService/routingAuthentication'
import Modal from '../../libraray/common/commonComponent/commonModel/commonModel'
import SessionStore from '../../libraray/common/Stores/sessionStore'
import * as SessionAction from '../../libraray/common/actions/sessionStorageAction'

const button = "Edit",
  buttonDelete = "Delete"
export default class AccountList extends Component {
  constructor(props){
    super(props)
    this.state = ({
        userData : [],
        isShowing : false,
        currentPage: 1,
        todosPerPage: 3

    })
    
    this.deleteModelOpen = this.deleteModelOpen.bind(this);
    this.viewClick = this.viewClick.bind(this);
    this.deleteApiCall = this.deleteApiCall.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.sessionSuccess = this.sessionSuccess.bind(this);
    this.paginationClick = this.paginationClick.bind(this);
    // this.getUser = this.getUser.bind(this);

}

    componentDidMount() {
        
      if(!routingAuth.routingAuthForUser()){
        SessionAction.sessionClearAction()
        SessionStore.on("SESSION_SUCCESS",this.sessionSuccess)
        console.log("++++++INSIDE ACOOUNT LIST")
        this.props.history.push('/login')
      }
    this.getUser()
    }

    componentWillUnmount() {
      SessionStore.on("SESSION_SUCCESS",this.sessionSuccess)
      } 

    sessionSuccess(){
      console.log("Success Emit ")
    }


    paginationClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }


    viewClick(id){
      this.props.history.push('/edit-account/'+id,{route : "edit-account"})
    }


    deleteModelOpen(id) { 
      this.deleteId = id
      this.setState({
        isShowing: true,
    },()=>{
      console.log("OpenDeleteModal",this.state)
    })
    }


    deleteApiCall(){
      const to =  sessionStorage.getItem("token")
      if(to){ 
      apiUtil.apiUtilPost(`/admin/deleteUser`,{
        _id : this.deleteId
      })
          .then(res => {
            this.getUser()
            this.closeModalHandler()
              console.log("Get DOne",res)
          }).catch(err => {
              console.log("Error",err)
          })
    }
    }


    closeModalHandler(){
      this.setState({
          isShowing: false

      });
    }


    getUser(){
      const to =  sessionStorage.getItem("token")
        if(to){
          console.log(to,"token")
          apiUtil.apiUtilGet(`/admin/getAllUser`)
              .then(res => {   
                this.allUser = res.data.response
                this.setState({userData:  this.allUser});
                  console.log("Get DOne")
              }).catch(err => {
                  console.log("Error",err)
              })
        }
    }
      

    render(){
        if(!LoginStore.isLoggedIn()){
          this.props.history.push('/login')
        }
      
        let {userData = [],currentPage, todosPerPage}= this.state;
        

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = userData.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(userData.length / todosPerPage); i++) {
          pageNumbers.push(i);
          console.log(pageNumbers,"PageNumbers")
        }
        const renderPageNumbers = pageNumbers.map(number => {
         console.log(number,"Number")
          return (
            <li className = "pagination"
              key={number}
              id={number}
              onClick={this.paginationClick}
            >
          {number}  
           </li>
          );
        });
        console.log(renderPageNumbers,"pppppp")

        return (
          <div>
                <div>
                    { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                    {/* <button className="open-modal-btn" onClick={this.openModalDeposit}>Deposit</button> */}

                    { this.state.isShowing && <Modal
                        className="modal"
                        show={this.state.isShowing}
                        close={this.closeModalHandler}
                        call =  {this.deleteApiCall }>
                        Are you sure you want to delete this user?
                      
                        {/* <label>Select</label>  
                        <Dropdown options = {option} handleChange = {this.amountHandler} name = "optionForPayment" /> */}
                        {/* <label>Select</label>   */}
                        {/* <Dropdown options = {optionForCardType} handleChange = {this.amountHandler} name = "optionForCardType" /> */}
                    
                    </Modal>}
                </div>




          <form onSubmit = {(e) => e.preventDefault()} className = "form-table">
                
                <table className = 'tablespace'>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                            <th>Account Number</th>
                            <th>Age</th>
                            <th>Religion</th>
                            <th>Adhar Card Number</th>
                            <th>Pan Card Number</th>
                            <th>Account Balance</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                              !! currentTodos && currentTodos.map((item, key) =>
                              <tr key ={item._id || key}>
                              <td>{key+1}</td>
                              <td>{item.firstName} {item.lastName}</td>
                              <td>{item.mobileNumber}</td>
                              <td>{item.emailId}</td>
                              <td>{item.accountNo}</td>
                              <td>{item.age}</td>
                              <td>{item.religion}</td>
                              <td>{item.adharCardNumber}</td>
                              <td>{item.panCardNo}</td>
                              <td>{item.balance}</td>

                              <td >
                            <div style={{display: "flex"}}>
                              <Button  className = 'button-font' value = {button} onClick ={()=>this.viewClick(item._id)} />
                              <Button  className = 'button-font' value = {buttonDelete} onClick={()=>this.deleteModelOpen(item._id)} /> 
                              </div>
                                </td>
                            </tr>
                              )}
                          
                        </tbody>
                      </table>
                      <div id="page-numbers">
                      {renderPageNumbers}
                    </div>
                      </form>
          </div>
        );
      }
    
    }

