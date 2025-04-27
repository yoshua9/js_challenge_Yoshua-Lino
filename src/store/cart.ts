import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

/**
 * @store cart
 * @description Store for managing shopping cart state
 */
export const useCartStore = defineStore('cart', () => {
    // State
    const cartItems = ref<CartItem[]>([])

    /**
     * @function addToCart
     * @description Adds a product to the cart or increments its quantity if it already exists
     * @param {Product} product - Product to add
     * @param {number} quantity - Quantity to add (default: 1)
     */
    function addToCart(product: Product, quantity: number = 1) {
        const existingItem = cartItems.value.find(item => item.product.id === product.id)
        if (existingItem) {
            existingItem.quantity += quantity
            existingItem.addedAt = Date.now()
        } else {
            cartItems.value.push({
                product,
                quantity,
                addedAt: Date.now()
            })
        }
    }

    /**
     * @function removeFromCart
     * @description Removes a product from the cart or reduces its quantity
     * @param {number} productId - ID of the product to remove
     * @param {number} quantity - Quantity to remove (default: 1)
     */
    function removeFromCart(productId: number, quantity: number = 1) {
        const existingItem = cartItems.value.find(item => item.product.id === productId)
        if (existingItem) {
            existingItem.quantity = Math.max(0, existingItem.quantity - quantity)
            if (existingItem.quantity === 0) {
                cartItems.value = cartItems.value.filter(item => item.product.id !== productId)
            }
        }
    }

    /**
     * @function clearCart
     * @description Completely empties the cart
     */
    function clearCart() {
        cartItems.value = []
    }

    // Getters (computed)
    /**
     * @computed totalItems
     * @description Calculates the total number of items in the cart
     */
    const totalItems = computed(() =>
        cartItems.value.reduce((total, item) => total + (Number(item.quantity) || 0), 0)
    )

    /**
     * @computed totalPrice
     * @description Calculates the total price of the cart
     */
    const totalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    })

    /**
     * @computed orderedCartItems
     * @description Returns cart items sorted by addition date (most recent first)
     */
    const orderedCartItems = computed(() => {
        return [...cartItems.value].sort((a, b) => b.addedAt - a.addedAt)
    })

    // localStorage persistence data
    watch(cartItems, (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart))
    }, { deep: true })

    /**
     * @function loadCart
     * @description Loads the cart from localStorage
     */
    function loadCart() {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            cartItems.value = JSON.parse(storedCart)
        }
    }

    // localStorage initial load
    loadCart()

    return {
        cartItems,
        totalItems,
        totalPrice,
        orderedCartItems,
        addToCart,
        removeFromCart,
        clearCart,
    }
})
