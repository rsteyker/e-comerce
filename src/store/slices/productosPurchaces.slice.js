import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helpers/getConfig';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const productsPurchasesSlices = createSlice({
		name: 'productsPurchases',
        initialState: [],
        reducers: {
            setproductsPurchases : ( state, action ) => {
                return action.payload
        }
    }
})

export const getProductsPurchasesThunk = () => dispatch => {
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
        .then(resp => dispatch(setproductsPurchases(resp.data)))
        .catch(err => console.error(err))
}

export const createProductsPurchasesThunk = data => dispatch =>{
    axios
        .post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, data, getConfig())
        .then( (resp) => dispatch(getProductsPurchasesThunk()))
        .catch( err => console.error(err))
}

export const productsCheckoutThunk = () => dispatch =>{
    axios
        .post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, null , getConfig())
        .then( resp => dispatch( getProductsPurchasesThunk() ))
        .catch(err => console.error(err))
}

export const { setproductsPurchases } = productsPurchasesSlices.actions;

export default productsPurchasesSlices.reducer;