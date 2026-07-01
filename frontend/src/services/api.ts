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

export async function toggleFavoriteApi(id: number) {
  const response = await axios.post(`${url}/favorite/${id}`)
  return response
}

export async function moveToTrashApi(id: number) {
  const response = await axios.post(`${url}/trash/${id}`)
  return response
}

export async function restoreApi(id: number) {
  const response = await axios.post(`${url}/restore/${id}`)
  return response
}

export async function deletePermanentApi(id: number) {
  const response = await axios.delete(`${url}/permanent/${id}`)
  return response
}
