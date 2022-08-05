import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import LoadingScreen from '../shared/LoadingScreen'
// import getAllOrders from oders from api directory that is going to be added later
import { getAllOrders } from '../../api/orders'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}
const Order = (props) => {
    console.log(props)
    const [orders, setOrders] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {

        getAllOrders()
            .then(res => setOrders(res.data.orders))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getOrdersFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If there is no order
    if (!orders) {
        return <LoadingScreen />
    } else if (orders.length === 0) {
        return <p>Sorry, you have no orders.</p>
    }


    const orderCards = orders.map((product, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
            {/* <Card.Header>{item.name}</Card.Header> */}
            <Card.Body>
                {/* <Link to={`/items/${item._id}`}><img src={item.image} alt={item.name}></img></Link> */}
            </Card.Body>
        </Card>
    ))

}

export default Order