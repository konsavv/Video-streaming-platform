import { defineStore } from "pinia";
import { uploadFileApi, getFileListApiSevice, getFavFileListApiSevice, getTrashedFileListApiSevice } from "@/services/api";
import { ref } from "vue"

export const useMainStore = defineStore('mainstore', () => {
  const filelist = ref([]);
  const favfilelist = ref([]);
  const trashedfilelist = ref([]);

  const uploadFile = (file: any) => {
    uploadFileApi(file).then((response: any) => {
      console.log(response);
    })
  }
  const getFileListApi = () => {
    getFileListApiSevice().then((resp: any) => {
      filelist.value = resp.data.filelist
    })
  }

  const getFavFileListApi = () => {
    getFavFileListApiSevice().then((resp: any) => {
      favfilelist.value = resp.data.filelist
    })
  }

  const getTrashedFileListApi = () => {
    getTrashedFileListApiSevice().then((resp: any) => {
      trashedfilelist.value = resp.data.filelist
    })
  }
  return { filelist, favfilelist, trashedfilelist, uploadFile, getFileListApi, getFavFileListApi, getTrashedFileListApi }
})

