<!--
@component ProductCard
@description Reusable component that displays a product card with image, title, description and price
@props {Product} product - The product object containing all necessary information
-->

<script setup lang="ts">
import type { Product } from '@/types/product';
import type { PropType } from 'vue';

/**
 * @description Props definition for the ProductCard component
 */
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<template>
  <div class="product-card border-r-m">
    <div class="product-card__header">
      <img 
        class="border-r-m" 
        :src="props.product?.thumbnail" 
        :alt="props.product?.title"
      >
    </div>
    <div class="product-card__body">
      <p class="product-title">{{ props.product?.title }}</p>
      <span class="product-description">{{ props.product.description }}</span>
    </div>
    <div class="product-card__footer">
      <p class="product-price">{{ `${props.product?.price} $` }}</p>
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
    padding: 10px 30px;

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
  }
}
</style>
