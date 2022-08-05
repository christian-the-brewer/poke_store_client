import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getAllOrders = () => {
    return axios({
        url: `${apiUrl}/orders`,
        method: 'GET'
    })
}

// READ => SHOW
export const getOneOrder = (id) => {
    return axios(`${apiUrl}/orders/${id}`)
}

// DELETE
export const removeOrder = (user, orderId) => {
    return axios({
        url: `${apiUrl}/orders/${orderId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}