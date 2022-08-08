import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getAllCarts = () => {
    return axios({
        url: `${apiUrl}/carts`,
        method: 'GET'
    })
}

// READ => SHOW
export const getOneCart = (id) => {
    return axios(`${apiUrl}/carts/${id}`)
}

// CREATE
export const createCart = (user, newCart) => {

    return axios({
        url: apiUrl + '/carts',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { cart: newCart }
    })
}

// UPDATE
export const updateCart = (user, updatedCart) => {

    console.log('this is updatedCart', updatedCart)

    return axios({
        url: `${apiUrl}/carts/${updatedCart._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { cart: updatedCart }
    })
}

// DELETE
export const removeCart = (user, cartId) => {
    return axios({
        url: `${apiUrl}/carts/${cartId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

// Add to cart
export const addToCart = (user, cartId, addedItem) => {

    return axios({
        url: `${apiUrl}/carts/add/${cartId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { product: addedItem }
    })
}