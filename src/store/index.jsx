import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'
import isLoading from './slices/isLoading.slice'
import productosPurchaces from './slices/productosPurchaces.slice'

export default configureStore({
  reducer: {
    product,
    isLoading,
    productosPurchaces
	}
})