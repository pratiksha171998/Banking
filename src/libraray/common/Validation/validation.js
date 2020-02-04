

export function isValid(data){

    let error = {};
    let formIsValid = true;
    if( !data["emailId"]){
        formIsValid = false;
        error["emailId"] = "Email can't be empty ";
     }
     if(data["password"] && data["password"].length < 8){
        formIsValid = false;
        error["password"] = "Password must be of 8 characters";
     }
     if(!data["password"]){
        formIsValid = false;
        error["password"] = "Password must be of 8 characters";
     }
     return ({formIsValid,error})
}