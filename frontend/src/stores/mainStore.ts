import { defineStore } from "pinia";
import { uploadFileApi } from "@/services/api";

export const useMainStore = defineStore('mainstore', ()=>{
  const uploadFile = (file:any)=>{
    uploadFileApi(file).then((response:any)=>{
      console.log(response);
    })
  }
  return{uploadFile}
})