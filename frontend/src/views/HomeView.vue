<template>
  <div class="flex flex-col md:flex-wrap md:flex-row gap-10">
    <video-card v-for="files in store.filelist" :key="files" :videofile="files"></video-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import VideoCard from "@/components/VideoCard.vue"

const store = useMainStore()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  store.getFileListApi()
})
</script>
