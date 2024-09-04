
import axios from 'axios';
import { SERVER } from "$lib/value";
import { getApi } from './api';
import { clearToken } from '$lib/store/auth';

export async function uploadFiles(dataFile: File, refFile: File, dataType: string) {
  const formData = new FormData();
  formData.append('data', dataFile);
  formData.append('refer', refFile);
  formData.append('type', dataType);


  const access_token = localStorage.getItem("token");

  try {
    const res = (await axios.post(`${SERVER}/api/excel/upload`, formData,

      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access_token}`
        }
      }));

   return res.data.data;



  } catch (error) {
    alert('error');
  }


}




export async function getData(type:string, timestamp:string, anti:string,name:string) {
  try {
    
  const token = localStorage.getItem("token");
   const res = (await axios.get(`${SERVER}/api/excel/plots/${type}/${timestamp}/${anti}/${name}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
   })).data;

    return res;
  } catch (error:Object) {
    const status:Number = error.response.status;


    if(status === 403){
      alert("Non Authorization");
      clearToken();
      window.location.href="/login";
    }
    
  }
}