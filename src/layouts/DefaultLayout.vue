<script setup lang="ts">
import Header from '../components/Header.vue';
</script>

<template>
  <div class="layout">
    <Header />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
