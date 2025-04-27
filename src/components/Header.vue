<!--
@component Header
@description Main header component with navigation and cart items counter
-->

<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { totalItems, totalPrice } = storeToRefs(cartStore);
</script>

<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo text-white">E-Commerce</router-link>
      <div class="nav-items">
        <router-link class="nav-item text-white" to="/">{{ $t('header.products') }}</router-link>
        <router-link class="nav-item text-white cart-link" to="/cart">
          <i class="fas fa-shopping-cart"></i>
          <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
        </router-link>
        <span class="cart-total">{{ `${(Math.ceil(totalPrice * 100) / 100).toFixed(2)} $` }}</span>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  width: 100%;
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
      align-items: center;

      a.nav-item {
        font-size: 1.2rem;
        text-decoration: none;
      }

      .cart-link {
        position: relative;
        font-size: 1.4rem;
        padding: 0.5rem;

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--secondary-color);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      }

      .cart-total {
        color: var(--white-color);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .nav {
      .nav-items {
        a.nav-item,
        span {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
