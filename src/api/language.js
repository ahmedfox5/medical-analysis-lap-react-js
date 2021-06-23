import axios from "axios";

export async function getAr(){
    const response = await axios.get('/lang/ar.json');
    return response;
}

export async function getEn(){
    const response = await axios.get('/lang/en.json');
    return response;
}