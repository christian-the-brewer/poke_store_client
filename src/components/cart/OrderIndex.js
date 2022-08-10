import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllOrders } from '../../api/orders'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const OrderIndex = (props) => {
    const [carts, setCarts] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    //console.log('Props in ItemIndex', props)

    useEffect(() => {

        getAllOrders()
            .then(res => setCarts(res.data.carts))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting carts',
                    message: messages.getOrderFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [])

   
    if (error) {
        return <p>Error!</p>
    }

    // If carts haven't loaded yet
    if (!carts) {
        return <LoadingScreen />
    } else if (carts.length === 0) {
        return <p>Sorry, looks like you haven't purchased anything yet.</p>
    }

    const orderCards = carts.map((cart, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
           <Card.Header>
                 Order: {index + 1}
           </Card.Header>
            <Card.Body>
                <ul>
                    { cart.products.map((product, index) => (
                         <li key={index}>{product.name}: ${product.cost}</li>
                     ))}

                </ul>
            </Card.Body>
            <Card.Footer>
                <div>
                    <p>
                        Total Cost:
                    </p>
                </div>
            </Card.Footer>
        </Card >
    ))

    
}

export default OrderIndex