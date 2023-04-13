import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productSlice = createSlice({
		name: 'products',
        initialState: [],
        reducers: {
            setProducts : ( state, action ) => {
                return action.payload
            }
    }
})

export const getProductThunk = () => dispatch => {
    dispatch( setIsLoading(true) )
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products`)
        .then( resp => dispatch( setProducts(resp.data) ) )
        .catch( err => console.error(err))
        .finally( () => dispatch( setIsLoading(false) ))
}

//Filtradas por categoría
export  const filterCategoriesThunk = id => dispatch => {
    dispatch( setIsLoading(true) )
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then( resp => dispatch( setProducts(resp.data)))
        .catch( err => console.error(err))
        .finally( () => dispatch( setIsLoading(false) ) )
}

//Busqueda por nombre
export const filterTiltleThunk =  valueInput => dispatch => {
    dispatch( setIsLoading(true) )
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${valueInput}`)
        .then( resp => dispatch(setProducts(resp.data)))
        .catch( err => console.error(err))
        .finally( () => dispatch( setIsLoading( false )))
}


export const { setProducts } = productSlice.actions;

export default productSlice.reducer;