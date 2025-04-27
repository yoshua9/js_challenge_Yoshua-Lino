<!--
@component Products
@description Main view that displays the product list with pagination
@props No props received
@emits No events emitted
-->

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ProductCard from '@/components/ProductCard.vue';
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { productsService } from '@/services/products';
import type { Product } from '@/types/product';

const { t } = useI18n();
const { fetchProducts } = productsService;
const products = ref<Product[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);
const productsPerPage = ref(6);
const isLoading = ref(false);
const error = ref<string | null>(null);

/**
 * @description Initializes states to their default values
 */
const initData = () => {
  products.value = [];
  currentPage.value = 1;
  totalPages.value = 1;
  totalProducts.value = 0;
  error.value = null;
};

/**
 * @description Loads products from the API
 * @async
 */
const loadProducts = async () => {
  try {
    isLoading.value = true;
    const productsResponse = await fetchProducts({
      page: currentPage.value,
      limit: productsPerPage.value
    });
    products.value = productsResponse.products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        thumbnail: product.thumbnail,
      };
    });
    totalPages.value = Math.ceil(productsResponse.total / productsPerPage.value);
    totalProducts.value = productsResponse.total;
  } catch (err) {
    error.value = t('products.errorLoadingProducts');
    console.error('Error loading products:', err);
  } finally {
    isLoading.value = false;
  }
};

/**
 * @description Handles page change
 * @param {number} page - Page number to navigate to
 */
const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadProducts();
};

/**
 * @description Calculates visible pages in pagination
 * @computed
 */
const visiblePages = computed(() => {
  const maxVisiblePages = 3;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let start = Math.max(2, currentPage.value - halfVisible);
  let end = Math.min(totalPages.value - 1, start + maxVisiblePages - 1);

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(2, end - maxVisiblePages + 1);
  }

  const middlePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const pages = [1, ...middlePages];

  if (totalPages.value > 1) {
    if (pages[pages.length - 1] !== totalPages.value) {
      pages.push(totalPages.value);
    }
  }

  return pages;
});

/**
 * @description Navigates to previous page
 */
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    handlePageChange(currentPage.value - 1);
  }
};

/**
 * @description Navigates to next page
 */
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    handlePageChange(currentPage.value + 1);
  }
};

// Initializes data and loads products when component is mounted
onMounted(async () => {
  initData();
  await loadProducts();
});
</script>

<template>
  <DefaultLayout>
    <template #title>
      <div class="product-title__container border-r-m">
        <h1 class="text-h1">{{ $t('products.title') }}</h1>
      </div>
    </template>
    <template #body>
      <div class="product-body__container container border-r-m">
        <!-- Error state -->
        <div v-if="error" class="error-container">
          {{ error }}
        </div>

        <!-- Products grid -->
        <div v-else class="products-grid d-flex align-center justify-between flex-wrap">
          <div v-if="isLoading" class="loading-container d-flex align-center justify-center">
            {{ $t('products.loadingProducts') }}
          </div>

          <div v-if="!isLoading" class="products-cards d-flex justify-between justify-sm-center flex-wrap">
            <div v-for="product in products" :key="product.id" class="product-card">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="pagination-button"
            :disabled="currentPage === 1"
            @click="goToPreviousPage"
          >
          {{ $t('products.previous') }}
        </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            class="pagination-button"
            :class="{ active: currentPage === page }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>

          <button
            class="pagination-button"
            :disabled="currentPage === totalPages"
            @click="goToNextPage"
          >
            {{ $t('products.next') }}
          </button>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<style scoped>
.product-title__container {
  padding: 20px;
  margin-bottom: 40px;
  background-color: var(--white-color);
}

.loading-container,
.error-container {
  width: 100%;
  text-align: center;
  padding: 20px;
}

.product-body__container {
  width: 100%;
  padding: 20px;

  .products-grid {
    width: 100%;
    min-height: 50vh;
    margin-bottom: 50px;

    .products-cards {
      gap: 50px;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination-button {
  padding: 8px 16px;
  border: 1px solid var(--primary-color);
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  min-width: 40px;
  transition: all 0.3s ease;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  background: var(--primary-color);
  color: white;
}

.pagination-button:not(:disabled):hover {
  background: var(--primary-color);
  color: white;
}
</style>
