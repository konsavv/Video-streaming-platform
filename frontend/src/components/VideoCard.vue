<template>
  <div class="flex w-full md:w-64 md:h-80 mb-2 rounded-md relative">
    <video :src="videosrc" class="h-full w-full rounded-md object-cover bg-black" controls preload="metadata"></video>
    <div class="flex gap-3 absolute top-2 right-2 z-20">
      <span class="cursor-pointer hover:scale-125 transition-transform bg-black/50 rounded-full p-1.5">
        <icon-heart class="text-white" />
      </span>
      <span class="cursor-pointer hover:scale-125 transition-transform bg-black/50 rounded-full p-1.5">
        <icon-trash class="text-white" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type VideoFile } from '@/types';
import { computed } from 'vue';
import { url } from '@/services/global';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconHeart from '@/components/icons/IconHeart.vue';

interface Props {
  videofile: VideoFile
}
const props = defineProps<Props>()
// Stream the actual video file (playable). "#t=0.1" shows the first frame as a preview.
const videosrc = computed(() => {
  return `${url}/videos/${encodeURIComponent(props.videofile.filename)}#t=0.1`
})
</script>
