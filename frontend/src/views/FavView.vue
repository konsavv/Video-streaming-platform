<template>
  <div class="p-4 md:p-8">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Favorites</h1>
    <div v-if="store.favfilelist.length" class="flex flex-col md:flex-wrap md:flex-row gap-8">
      <video-card v-for="file in store.favfilelist" :key="file.id" :videofile="file" context="favorites"></video-card>
    </div>
    <p v-else class="text-gray-400 mt-16 text-center">
      No favorites yet. Tap the heart on a video to add it here.
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import VideoCard from "@/components/VideoCard.vue"

const store = useMainStore()

onMounted(() => {
  store.getFavFileListApi()
})
</script>
