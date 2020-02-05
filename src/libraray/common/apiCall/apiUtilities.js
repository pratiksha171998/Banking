import axios from 'axios';

const Url = `http://192.168.1.82:4000`
 
const getHeaders = ()=> {
  return {
    
    headers: {
      'Content-Type': 'application/json',
      'access_token' : sessionStorage.getItem('token')
    },
  };
};

const apiUtilGet = (path) => {
  return new Promise((resolve, reject) => {
    axios.get(`${Url}${path}`, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};

const apiUtilPost = (path, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${Url}${path}`, data, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(error) });
  });
};


export {apiUtilPost, apiUtilGet}