<!--
@component Cart
@description Displays the shopping cart with items, quantities, and removal functionality
-->

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";

// Store and state management
const cartStore = useCartStore();
const { orderedCartItems } = storeToRefs(cartStore);
const { removeFromCart, clearCart } = cartStore;

/**
 * @function handleRemoveFromCart
 * @description Handles the removal of a product from the cart with the specified quantity
 * @param {number} productId - ID of the product to remove
 */
const handleRemoveFromCart = (productId: number) => {
  removeFromCart(productId);
};

</script>

<template>
  <DefaultLayout>
    <template #title>
      <div class="cart-title__container d-flex justify-between border-r-m">
        <h1 class="text-h1">{{ $t('cart.title') }}</h1>

        <button
            :disabled="orderedCartItems.length < 1"
            @click="clearCart"
            class="clear-cart-btn"
        >
          {{ $t('cart.clearCart') }}
        </button>
      </div>
    </template>
    <template #body>
      <div class="cart-body_container container border-r-m">

        <!-- Cart list -->
        <div v-if="orderedCartItems.length > 0  && orderedCartItems.some(item => item.quantity > 0)" class="cart-list">
          <div v-for="item in orderedCartItems" :key="item.product.id" class="cart-item">
            <div v-if="item.quantity > 0" class="cart-item__details d-flex flex-wrap justify-between">
              <div class="product-details d-flex align-items-center">
                <img
                  class="product-image"
                  :src="item.product.thumbnail"
                  :alt="item.product.title"
                >
                <p>{{ item.product.title }}</p>
              </div>

              <div class="product-prices">

                <p>{{ `${$t('cart.unit')}: ${item.quantity}` }}</p>
                <p class="product-price">{{
                    $t('cart.total', { total: (Math.ceil(item.product.price * item.quantity * 100) / 100).toFixed(2) })
                  }}</p>
              </div>

              <input
                type="number"
                v-model="item.quantity"
                :min="1"
                class="quantity-input d-flex justify-center border-r-m"
              >


              <div class="quantity-control d-flex flex-wrap align-items-center gap-2">
                <button
                  class="remove-btn"
                  @click="handleRemoveFromCart(item.product.id)"
                >
                  {{ $t('cart.remove') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty cart state -->
        <div v-else class="empty-cart d-flex flex-wrap flex-column justify-center align-items-center">
          <h2>{{ $t('cart.emptyCart') }}</h2>
          <router-link to="/" class="">
            {{ $t('cart.shopNow') }}
          </router-link>
        </div>

      </div>
    </template>
  </DefaultLayout>
</template>

<style scoped>
.cart-title__container {
  padding: 20px;
  margin-bottom: 40px;
  background-color: var(--white-color);

  .clear-cart-btn {
    padding: 8px 16px;
    background-color: var(--danger-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.cart-body_container {
  padding: 20px;
  margin-bottom: 40px;
  background-color: var(--white-color);

  .cart-item__details {
    margin-bottom: 20px;

    .product-details {
      width: 40%;
      gap: 20px;
      margin-bottom: 20px;

      .product-image {
        width: 30px;
        height: 30px;
        object-fit: contain;
        border-radius: 50%;
      }
    }

    .product-prices {
      width: 30%;
    }

    .quantity-input {
      width: 100px;
      padding: 4px;
      text-align: center;
    }

    .quantity-control {
      .remove-btn {
        padding: 16px;
        background-color: var(--danger-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  .empty-cart {
    padding: 20px;

    h2 {
      margin-bottom: 20px;
    }
  }
}
</style>
