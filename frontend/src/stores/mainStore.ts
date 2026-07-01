import { defineStore } from "pinia";
import {
  uploadFileApi,
  getFileListApiSevice,
  getFavFileListApiSevice,
  getTrashedFileListApiSevice,
  toggleFavoriteApi,
  moveToTrashApi,
  restoreApi,
  deletePermanentApi,
} from "@/services/api";
import { ref } from "vue"
import { type VideoFile } from "@/types";

export const useMainStore = defineStore('mainstore', () => {
  const filelist = ref<VideoFile[]>([]);
  const favfilelist = ref<VideoFile[]>([]);
  const trashedfilelist = ref<VideoFile[]>([]);

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

  // Refresh every list so all tabs stay in sync after an action
  const refreshAll = () => {
    getFileListApi();
    getFavFileListApi();
    getTrashedFileListApi();
  }

  const uploadFile = (file: any) => {
    uploadFileApi(file).then((response: any) => {
      console.log(response);
      refreshAll();
    })
  }

  const toggleFavorite = async (id: number) => {
    await toggleFavoriteApi(id);
    refreshAll();
  }

  const moveToTrash = async (id: number) => {
    await moveToTrashApi(id);
    refreshAll();
  }

  const restore = async (id: number) => {
    await restoreApi(id);
    refreshAll();
  }

  const deletePermanent = async (id: number) => {
    await deletePermanentApi(id);
    refreshAll();
  }

  return {
    filelist,
    favfilelist,
    trashedfilelist,
    getFileListApi,
    getFavFileListApi,
    getTrashedFileListApi,
    refreshAll,
    uploadFile,
    toggleFavorite,
    moveToTrash,
    restore,
    deletePermanent,
  }
})
