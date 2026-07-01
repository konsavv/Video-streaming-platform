<template>
  <div class="p-4 md:p-8">
    <h1 class="text-xl font-semibold text-gray-800 mb-6">Trash</h1>
    <div v-if="store.trashedfilelist.length" class="flex flex-col md:flex-wrap md:flex-row gap-8">
      <video-card v-for="file in store.trashedfilelist" :key="file.id" :videofile="file" context="trash"></video-card>
    </div>
    <p v-else class="text-gray-400 mt-16 text-center">
      Trash is empty.
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import VideoCard from "@/components/VideoCard.vue"

const store = useMainStore()

onMounted(() => {
  store.getTrashedFileListApi()
})
</script>
