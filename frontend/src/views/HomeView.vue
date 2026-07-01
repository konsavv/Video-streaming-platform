<template>
  <div class="p-4 md:p-8">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">All Videos</h1>
    <div v-if="store.filelist.length" class="flex flex-col md:flex-wrap md:flex-row gap-8">
      <video-card v-for="file in store.filelist" :key="file.id" :videofile="file" context="home"></video-card>
    </div>
    <p v-else class="text-gray-400 mt-16 text-center">
      No videos yet. Use the upload button on the top right to add one.
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import VideoCard from "@/components/VideoCard.vue"

const store = useMainStore()

onMounted(() => {
  store.getFileListApi()
})
</script>
