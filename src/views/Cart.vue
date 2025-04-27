<!--
@component Cart
@description Displays the shopping cart with items, quantities, and removal functionality
-->

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useCartStore } from "@/store/cart";
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";

// Store and state management
const cartStore = useCartStore();
const { orderedCartItems } = storeToRefs(cartStore);
const { removeFromCart, clearCart } = cartStore;
// Tracks quantities to remove for each product
const removeQuantities = ref<{ [key: number]: number }>({});

/**
 * @function initializeRemoveQuantities
 * @description Initializes the remove quantities for each cart item
 */
const initializeRemoveQuantities = () => {
  orderedCartItems.value.forEach(item => {
    removeQuantities.value[item.product.id] = 1;
  });
};

/**
 * @function handleRemoveFromCart
 * @description Handles the removal of a product from the cart with the specified quantity
 * @param {number} productId - ID of the product to remove
 */
const handleRemoveFromCart = (productId: number) => {
  const quantityToRemove = removeQuantities.value[productId] || 1;
  removeFromCart(productId, quantityToRemove);
  removeQuantities.value[productId] = 1;
};

onMounted(() =>{
  initializeRemoveQuantities();
})
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


              <div class="quantity-control d-flex flex-wrap align-items-center gap-2">
                <input
                  type="number"
                  v-model="removeQuantities[item.product.id]"
                  :min="1"
                  :max="item.quantity"
                  class="quantity-input"
                >
                <button
                  :disabled="removeQuantities[item.product.id] <= 0"
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

    .quantity-control {
      .quantity-input {
        width: 60px;
        padding: 4px;
        border: 1px solid var(--secondary-color);
        border-radius: 4px;
      }

      .remove-btn {
        padding: 4px 8px;
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
