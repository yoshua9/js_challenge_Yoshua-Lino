<script setup lang="ts">

</script>

<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo text-white">E-Commerce</router-link>
      <div class="nav-items">
        <router-link class="nav-item text-white" to="/">{{ $t('header.products') }}</router-link>
        <router-link class="nav-item text-white" to="/cart">{{ $t('header.cart') }}</router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  background: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }

    .nav-items {
      display: flex;
      gap: 1rem;

      a.nav-item {
        font-size: 1.2rem;
        text-decoration: none;
      }
    }
  }
}
</style>
