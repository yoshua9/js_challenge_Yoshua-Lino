<!--
@component ProductCard
@description Reusable component that displays a product card with image, title, description and price
@props {Product} product - The product object containing all necessary information
-->

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '@/types/product';
import type { PropType } from 'vue';
import { useCartStore } from '@/store/cart';

/**
 * @description Props definition for the ProductCard component
 */
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});

const { addToCart } = useCartStore();
const productQty = ref(1);
const addProductToCart = () => {
  addToCart(props.product, productQty.value);
};
</script>

<template>
  <div class="product-card border-r-m">
    <div class="product-card__header">
      <img
        class="border-r-m"
        :src="props.product?.thumbnail"
        :alt="props.product?.title"
        loading="lazy"
      >
    </div>
    <div class="product-card__body">
      <p class="product-title">{{ props.product?.title }}</p>
      <span class="product-description">{{ props.product.description }}</span>
    </div>
    <div class="product-card__footer d-flex justify-between align-items-center">
      <p class="product-price">{{ `${props.product?.price} $` }}</p>

      <div class="add-cart__container d-flex align-center justify-end">
        <input
          type="number"
          class="add-cart__input border-r-m"
          v-model="productQty"
          min="1"
        >

        <button class="add-cart__btn border-r-m" @click="addProductToCart()">
          {{ $t('products.addToCart') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  max-width: 300px;
  background-color: var(--white-color);

  .product-card__header {
    img {
      background-color: var(--secondary-color);
    }
  }

  .product-card__body {
    padding: 10px 20px;

    .product-title {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .product-description {
      font-size: 12px;
      color: var(--light-black-color);
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .product-card__footer {
    padding: 0 20px 20px 20px;

    .product-price {
      width: 50%;
    }

    .add-cart__container {
      gap: 10px;
      .add-cart__input {
        width: 40%;
        text-align: center;
      }

      .add-cart__btn {
        width: 60%;
        background-color: var(--secondary-color);
        color: var(--white-color);
        border: none;
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
</style>
