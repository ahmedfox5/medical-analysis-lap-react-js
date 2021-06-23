import axios from 'axios';
const url = 'http://localhost:8000/api/blogs/';
let api_token = null;
if(sessionStorage.getItem('user')){
    api_token = JSON.parse(sessionStorage.getItem('user')).data.api_token;
}

export async function getBlogs(){
    try{
        const response = await axios.post(url ,api_token);
        return response;
    }catch(error){
        console.log(error);
    }
}  // end of get blogs


export async function createBlog(data){
    try{
        const response = await axios.post(url + "create" ,data);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of create blog


export async function deleteBlog(id){
    try{
        const response = await axios.post(url + 'delete' ,{id ,api_token});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of delete blog


export async function getBlog(id){
    try{
        const response = await axios.post(url + 'get' ,{id ,api_token});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of get blog


export async function updateBlog(data){
    try{
        const response = await axios.post(url + 'update' ,data);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of update blog

