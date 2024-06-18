import { postApi } from "./api.ts";
import axios from 'axios';
import { SERVER } from "$lib/value";

export async function uploadFiles(dataFile: File, refFile: File, dataType: string) {
  const formData = new FormData();
  formData.append('data', dataFile);
  formData.append('refer', refFile);
  formData.append('type', dataType);

  console.log(dataType);

  const access_token = localStorage.getItem("token");
  
  try {
    const res = (await axios.post(`${SERVER}/api/excel/upload`, formData,
  
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access_token}`
        }
      }));
    
    return res.data.files;
    

    
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해 주세요.');
  }


}