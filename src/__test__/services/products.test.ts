import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { productsService } from '@/services/products'
import { ProductsApiResponse } from '@/types/product'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const mockProductsResponse: ProductsApiResponse = {
  products: [
    {
      id: 1,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      thumbnail: 'test.jpg',
    }
  ],
  total: 100,
  skip: 0,
  limit: 6
}

describe('fetchProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch products with default pagination', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProductsResponse })

    const result = await productsService.fetchProducts({page: 1, limit: 6})

    expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=6&skip=0'
    )
    expect(result).toEqual(mockProductsResponse)
  })

  it('should fetch products with custom pagination', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProductsResponse })

    const result = await productsService.fetchProducts({ page: 2, limit: 6 })

    expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=6&skip=6'
    )
    expect(result).toEqual(mockProductsResponse)
  })

  it('should throw an error when the API call fails', async () => {
    const errorMessage = 'Network Error'
    mockedAxios.get.mockRejectedValue(new Error(errorMessage))

    await expect(productsService.fetchProducts({})).rejects.toThrow('Failed to fetch products')
  })
})
