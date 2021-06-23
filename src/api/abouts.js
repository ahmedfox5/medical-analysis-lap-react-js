import axios from 'axios';
const url = 'http://localhost:8000/api/abouts/';
let api_token = null;
if(sessionStorage.getItem('user')){
    api_token = JSON.parse(sessionStorage.getItem('user')).data.api_token;
}


export async function getAbouts() {
    try{
        const response = await axios.post(url ,{api_token});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of get abouts

export async function createAbout(data){
    try{
        const response = await axios.post(url + "create" ,data);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of create about


export async function deleteAbout(id){
    try{
        const response = await axios.post(url + 'delete' ,{id ,api_token});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of delete about


export async function getAbout(id){
    try{
        const response = await axios.post(url + 'get' ,{id ,api_token});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of get about


export async function updateAbout(data){
    try{
        const response = await axios.post(url + 'update' ,data);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of update about

