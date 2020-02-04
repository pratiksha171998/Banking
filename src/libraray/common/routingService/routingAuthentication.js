

export const routingAuthForUser = ()=>{
    let token = sessionStorage.getItem('token')
    let isAdmin = sessionStorage.getItem('isAdmin')
    // isAdmin = window.atob(isAdmin);

    return !!(token && isAdmin === 'true')
 
};