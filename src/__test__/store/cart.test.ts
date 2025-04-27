import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types/product'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    const mockStorage: { [key: string]: string } = {}
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
      (key: string, value: string) => {
        mockStorage[key] = value
      }
    )
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key: string) => mockStorage[key] || null
    )
    vi.spyOn(Storage.prototype, 'clear').mockImplementation(
      () => Object.keys(mockStorage).forEach(key => delete mockStorage[key])
    )
  })

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    thumbnail: 'test.jpg',
  }

  it('should add a product to cart', () => {
    const store = useCartStore()
    store.addToCart(mockProduct)

    expect(store.cartItems).toHaveLength(1)
    expect(store.cartItems[0].product).toEqual(mockProduct)
    expect(store.cartItems[0].quantity).toBe(1)
  })

  it('should increment quantity when adding same product', () => {
    const store = useCartStore()
    store.addToCart(mockProduct)
    store.addToCart(mockProduct)

    expect(store.cartItems).toHaveLength(1)
    expect(store.cartItems[0].quantity).toBe(2)
  })

  it('should remove a product from cart', () => {
    const store = useCartStore()
    store.addToCart(mockProduct)
    store.removeFromCart(mockProduct.id)

    expect(store.cartItems).toHaveLength(0)
  })

  it('should reduce quantity when removing part of the items', () => {
    const store = useCartStore()
    store.addToCart(mockProduct, 3)
    store.removeFromCart(mockProduct.id, 2)

    expect(store.cartItems[0].quantity).toBe(1)
  })

  it('should clear the cart', () => {
    const store = useCartStore()
    store.addToCart(mockProduct)
    store.clearCart()

    expect(store.cartItems).toHaveLength(0)
  })

  it('should calculate total items correctly', () => {
    const store = useCartStore()
    store.addToCart(mockProduct, 2)
    store.addToCart({ ...mockProduct, id: 2 }, 3)

    expect(store.totalItems).toBe(5)
  })

  it('should calculate total price correctly', () => {
    const store = useCartStore()
    store.addToCart(mockProduct, 2)
    store.addToCart({ ...mockProduct, id: 2, price: 200 }, 1)

    expect(store.totalPrice).toBe(400)
  })

  it('should load cart items from localStorage', () => {
    const initialCart = [{
      product: mockProduct,
      quantity: 1,
      addedAt: Date.now()
    }]
    localStorage.setItem('cart', JSON.stringify(initialCart))

    const store = useCartStore()
    expect(store.cartItems).toEqual(initialCart)
  })
})
