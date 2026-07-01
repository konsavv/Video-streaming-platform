<template>
  <div class="w-full md:w-64 mb-2">
    <div class="relative h-72 rounded-md overflow-hidden bg-black group">
      <video
        :src="videosrc"
        :poster="thumbsrc"
        class="h-full w-full object-cover bg-black"
        preload="metadata"
        controls></video>

      <!-- duration badge -->
      <span class="absolute top-2 left-2 z-20 text-xs font-medium text-white bg-black/60 px-1.5 py-0.5 rounded pointer-events-none">
        {{ prettyDuration }}
      </span>

      <!-- action buttons -->
      <div class="flex gap-2 absolute top-2 right-2 z-20">
        <template v-if="context !== 'trash'">
          <button
            @click="store.toggleFavorite(videofile.id)"
            class="cursor-pointer hover:scale-110 transition-transform bg-black/50 rounded-full p-1.5"
            :title="videofile.is_fav ? 'Remove from favorites' : 'Add to favorites'">
            <icon-heart-solid v-if="videofile.is_fav" class="text-red-500" />
            <icon-heart v-else class="text-white" />
          </button>
          <button
            @click="store.moveToTrash(videofile.id)"
            class="cursor-pointer hover:scale-110 transition-transform bg-black/50 rounded-full p-1.5"
            title="Move to trash">
            <icon-trash class="text-white" />
          </button>
        </template>
        <template v-else>
          <button
            @click="store.restore(videofile.id)"
            class="cursor-pointer hover:scale-110 transition-transform bg-black/50 rounded-full p-1.5"
            title="Restore">
            <icon-restore class="text-white" />
          </button>
          <button
            @click="store.deletePermanent(videofile.id)"
            class="cursor-pointer hover:scale-110 transition-transform bg-red-600/80 rounded-full p-1.5"
            title="Delete permanently">
            <icon-xmark class="text-white" />
          </button>
        </template>
      </div>
    </div>

    <!-- filename -->
    <p class="mt-1 px-1 text-sm text-gray-700 truncate" :title="videofile.filename">{{ prettyName }}</p>
  </div>
</template>

<script setup lang="ts">
import { type VideoFile } from '@/types';
import { computed } from 'vue';
import { url } from '@/services/global';
import { useMainStore } from '@/stores/mainStore';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconHeartSolid from '@/components/icons/IconHeartSolid.vue';
import IconRestore from '@/components/icons/IconRestore.vue';
import IconXmark from '@/components/icons/IconXmark.vue';

interface Props {
  videofile: VideoFile,
  context?: 'home' | 'favorites' | 'trash'
}
const props = withDefaults(defineProps<Props>(), { context: 'home' })
const store = useMainStore()

// The playable video stream. "#t=0.1" nudges the browser to the first frame.
const videosrc = computed(() => {
  return `${url}/videos/${encodeURIComponent(props.videofile.filename)}#t=0.1`
})

// Generated thumbnail (shown as the video poster until playback starts)
const thumbsrc = computed(() => {
  return `${url}/thumbnails/${encodeURIComponent(props.videofile.filename)}.jpg`
})

const prettyName = computed(() => props.videofile.filename.replace(/\.[^.]+$/, ''))

const prettyDuration = computed(() => {
  const total = Math.round(parseFloat(props.videofile.duration) || 0)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})
</script>
