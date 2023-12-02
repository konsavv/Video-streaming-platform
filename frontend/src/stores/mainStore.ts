import { defineStore } from "pinia";
import { uploadFileApi } from "@/services/api";

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
    getFileListApi().then((resp: any) => {
      filelist.value = resp.data.filelist
    })
  }

  const getFavFileListApi = () => {
    getFavFileListApi().then((resp: any) => {
      favfilelist.value = resp.data.filelist
    })
  }

  const getTrashedFileListApi = () => {
    getTrashedFileListApi().then((resp: any) => {
      trashedfilelist.value = resp.data.filelist
    })
  }
  return { uploadFile, getFileListApi, getFavFileListApi, getTrashedFileListApi }
})

