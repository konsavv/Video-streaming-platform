<template>
  <div class="flex w-full md:w-64 md:h-80 mb-2 rounded-md relative">
    <div class="absolute w-full h-full bg-gradient-to-t from-black">
      <img :src="filesrc" class="h-full w-full rounded-md z-0 object-cover cursor">
      <div class="flex gap-4 absolute bottom-3 z-20 w-full px-3">
        <span class="cursor-pointer hover:scale-125 transition-transform">
          <icon-trash class="text-white shadow-white"></icon-trash>
        </span>
        <span class="text-xs text-white grow text-center">
          <br />
        </span>
        <span class="cursor-pointer hover:scale-125 transition-transform">
          <icon-heart class="text-white" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type VideoFile } from '@/types';
import { computed } from 'vue';
import { url } from '@/services/global';

interface Props {
  videofile: VideoFile
}
const props = defineProps<Props>()
const filesrc = computed(() => {
  const imgfile = props.videofile.filename.replace("mp4", "jpg")
  return url + "/assets/images/" + imgfile
})
</script>
