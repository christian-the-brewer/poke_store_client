import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX
export const getAllOrders = (user) => {
    return axios({
        url: `${apiUrl}/orders`,
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        method: 'GET',
        data: { user: user }
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