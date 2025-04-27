import axios from 'axios';
import { ProductsApiResponse } from '@/types/product';

/**
 * Service to interact with the Products API.
 */
export const productsService = {
  /**
   * Fetches a paginated list of products from DummyJSON API.
   *
   * @param {Object} params - The parameters for pagination.
   * @param {number} params.page - The current page number (default is 1).
   * @param {number} params.limit - Number of products per page (default is 6).
   * @returns {Promise<ProductsApiResponse>} A promise that resolves to the products API response.
   * @throws {Error} Throws an error if the API call fails.
   */
  async fetchProducts({ page = 1, limit = 6 }): Promise<ProductsApiResponse> {
    try {
      const skip = (page - 1) * limit;
      const response = await axios.get<ProductsApiResponse>(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }
};
