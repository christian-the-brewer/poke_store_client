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
export const getOneCart = (user) => {
    return axios({
        url: apiUrl + '/carts',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
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
export const addToCart = (user, addedItem) => {

    return axios({
        url: `${apiUrl}/carts/add`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { product: addedItem }
    })
}

//checkout success
export const checkoutSuccess = (user, cartId) => {
    return axios({
        url: `${apiUrl}/carts/checkout/${cartId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: {
            cartId: cartId,
            user: user
        }
    })
}

//checkout success
export const removeFromCart = (user, cartId, itemId) => {
    return axios({
        url: `${apiUrl}/carts/edit/${cartId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: {
            cartId: cartId,
            user: user,
            itemId: itemId
        }
    })
}