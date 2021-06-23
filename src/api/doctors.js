import axios from 'axios';
const url = "http://localhost:8000/api/doctors/";

export async function getDoctors(){
    try{
        const response = await axios.post(url);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of get doctors


export async function createDoctor(data){
    try{
        const response = await axios.post(url + "create" ,data);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of create doctor


export async function deleteDoctor(id){
    try{
        const response = await axios.post(url + 'delete' ,{id : id});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of delete doctor


export async function getDoctor(id){
    try{
        const response = await axios.post(url + 'get' ,{id : id});
        return response;
    }catch(error){
        console.log(error);
    }
} // end of get doctor


export async function updateDoctor(data){
    try{
        const response = await axios.post(url + 'update' ,data);
        return response;
    }catch(error){
        console.log(error);
    }
} // end of update Doctor

