import axios from 'axios';
const url = 'http://localhost:8000/api/plans/';


//// get plans
export async function getPlans(){
    try{
        const response = await axios.post(url);
        return response;
    }catch(error){
        console.log(error);
    }
} //// end of get plans


//// create plane
export async function createPlane(data){
    try{
        const response = await axios.post(url + "create" ,data);
        return response;
    }catch(error){
        console.log(error);
    }
}


//// get plane 
export async function getPlane(id){
    try{
        const response = await axios.post(url + "get" ,{id:id});
        return response;
    }catch(error){
        console.log(error);
    }
}


//// delete plane 
export async function deletePlane(id){
    try{
        const response = await axios.post(url + "delete" ,{id:id});
        return response;
    }catch(error){
        console.log(error);
    }
}

//// update plane
export async function editPlan(data){
    try{
        const response = await axios.post(url + 'update',data);
        return response
    }catch(error){
        console.log(error);
    }
}


//// get full plans
export async function fullPlans (){
    try{
        const response = await axios.post(url + 'fullPlans');
        return response;
    }catch(error){
        console.log(error);
    }
}