<!--
@component DefaultLayout
@description Main layout component that provides the basic structure for the application
@slots
  - title: Slot for the page title section
  - body: Slot for the main content section
-->

<script setup lang="ts">
import Header from '../components/Header.vue';
</script>

<template>
  <div class="layout-container">
    <Header />
    <main class="layout-content">
      <slot name="title" />
      <slot name="body" />
    </main>
  </div>
</template>

<style scoped>
.layout-content {
  padding: 30px 20px;
}
</style>
