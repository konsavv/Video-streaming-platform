<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/favorites">Favorites</RouterLink>
    <RouterLink to="/trash">Trash</RouterLink>
  </nav>
  <RouterView />
</template>


