import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getAllItems = () => {
    return axios({
        url: `${apiUrl}/items`,
        method: 'GET'
    })
}

// READ => SHOW
export const getOneItem = (id) => {
    return axios(`${apiUrl}/items/${id}`)
}

// CREATE
export const createItem = (user, newItem) => {

    // in our createpet form, we're building an object
    // when we pass that object into the api createPet function,
    // it's going to look like the pets in our database
    // we're going to refer to this as newPet
    // console.log('this is user', user)
    // console.log('this is newPet', newPet)
    return axios({
        url: apiUrl + '/items',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { item: newItem }
    })
}

// UPDATE
export const updateItem = (user, updatedItem) => {
    // console.log('createItem in api was hit')
    // in our createitem form, we're building an object
    // when we pass that object into the api createItem function,
    // it's going to look like the items in our database
    // we're going to refer to this as newItem
    // console.log('this is user', user)
    console.log('this is updatedItem', updatedItem)

    return axios({
        url: `${apiUrl}/items/${updatedItem._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { item: updatedItem }
    })
}



export const updateStockItem = (item, updatedStock) => {

    console.log('this is updatedStock', updatedStock)

    return axios({
        url: `${apiUrl}/items/stock/${item._id}`,
        method: 'PATCH',
        data: { item: updatedStock }
    })
}

// DELETE
export const removeItem = (user, itemId) => {
    return axios({
        url: `${apiUrl}/items/${itemId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

