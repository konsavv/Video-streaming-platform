import axios from "axios";
import { url } from "./global";

export async function uploadFileApi(file: any) {

  let formdata = new FormData();

  formdata.append('videofile', file);
  const response = await axios.post(`${url}/uploadVideo`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response
}

export async function getFileListApiSevice() {
  const response = await axios.get(`${url}/filelist`)
  return response
}

export async function getFavFileListApiSevice() {
  const response = await axios.get(`${url}/favfilelist`)
  return response
}

export async function getTrashedFileListApiSevice() {
  const response = await axios.get(`${url}/binfilelist`)
  return response
}