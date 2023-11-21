import axios from "axios";
const url = "http://localhost:3000";

export async function uploadFileApi(file: any ){
  
  let formdata = new FormData();

  formdata.append('videofile', file);
  const response = await axios.post(`${url}/uploadVideo`,formdata, {
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response
}