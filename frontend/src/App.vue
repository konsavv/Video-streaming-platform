<template>
  <nav class="flex flex-row gap-3 bg-gray-50 text-gray-800 justify-between border-b border-gray-100 md:px-10">
    <div class="flex h-full">
      <RouterLink class="p-3" active-class="border-b-8 border-pastelGreen-200 " to="/">Home</RouterLink>
      <RouterLink class="p-3" active-class="border-b-8 border-pastelGreen-200 " to="/favorites">Favorites</RouterLink>
      <RouterLink class="p-3" active-class="border-b-8 border-pastelGreen-200 " to="/trash">Trash</RouterLink>
    </div>
    <div>
      <div class="justify-self-end flex gap-4 items-center justify-center">
        <IconUpload class="cursor-pointer" @click="doFileUpload" />
        <IconTrash v-if="currentRoute == 'trash'" class="cursor-pointer" />
        <input type="file" class="hidden" ref="fileElement" accept=".mp4,.mov" @change="doRealFileupload">
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import IconTrash from './components/icons/IconTrash.vue';
import IconUpload from './components/icons/IconUpload.vue';
import { useMainStore } from './stores/mainStore';

const router = useRouter();
const fileElement = ref();
const store = useMainStore();

const currentRoute = computed(() => {
  return router.currentRoute.value.name
});

const doFileUpload = () => {
  fileElement.value.click();
}

const doRealFileupload = () => {
  let file = fileElement.value.files[0];
  store.uploadFile(file)
}


</script>
