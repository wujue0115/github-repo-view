<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useHead } from '@unhead/vue';

useHead({
  title: 'GitHub Repo View',
  meta: [{ name: 'description', content: "Show GitHub user's repositories" }],
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
