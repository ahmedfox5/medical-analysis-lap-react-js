import axios from 'axios';
const url = 'http://localhost:8000/api/users/';
let api_token = null;


if(sessionStorage.getItem('api_token')){
    api_token = sessionStorage.getItem('api_token');
}


export async function login(data){
    try{
        const response = await axios.post(url + 'login' ,data);
        if(response.data.success){
            sessionStorage.setItem('api_token' ,response.data.user.data.api_token);
            api_token = sessionStorage.getItem('api_token');
        }
        return response;
    }catch(error){
        console.log(error);
    }
}

export async function register(data){
    try{
        const response = await axios.post(url + 'register' ,data);
        return response
    }catch(error){
        console.log(error);
    }
}


//// get all users
export async function getUsers(){
    try{
        const response = await axios.post(url ,{api_token});
        return response
    }catch(error){
        console.log(error);
    }
}

//// get user Results
export async function getUser(id){
    try{
        const response = await axios.post(url + 'get',{id ,api_token});
        return response
    }catch(error){
        console.log(error);
    }
}

//// create Results
export async function createResult(data){
    try{
        const response = await axios.post(url + 'create-result',data);
        return response
    }catch(error){
        console.log(error);
    }
}