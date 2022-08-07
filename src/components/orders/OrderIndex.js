import { useState, useEffect } from 'react'

import { Container, Card, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'

import { getAllOrders } from '../../api/orders'

import messages from '../shared/AutoDismissAlert/messages'
import { CardExpiryElement } from '@stripe/react-stripe-js'



const OrderIndex = (props) => {
    // Declare a new state variable, which we'll call `order` that will show all orders
    const [showAllOrders,setShowAllOrders] = useState(null)
    // Declare a new state variable, which we'll call `error` that will set error if orders failed to be fetched
    const [error, setError] = useState(false)
    // destruct msgAlert properites from props object
    const { msgAlert } = props

    useEffect(() => {
        // get all orders from orders api
        getAllOrders()
        // then from the promised response, get carts object from the cart collection
        // carts is an object that has a properties of products and owners
            .then(res => showAllOrders(res.data.carts))
            console.log("this is cart:", carts)
            // if the promised data is not returned then catch error
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getItemsFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
        }, [])

    // after set error is true render Error message
    if (error) {
        return <p>Error!</p>
    }

    // 2. filter `cart` by non-active orders to get all the past orders(orders that have already been purchased)
        // carts are object that have an active boolean property
        // the active orders are still inside the cart 

    // we are filtering the non active oders- filter()
    const isActive = () => {
    const pastOrder = carts?.filter((cart) => cart.active === false);
    setShowAllOrders(pastOrder);
    };
    isActive()
    console.log(showAllOrders)
        // <Card style={{ width: '30%', margin: 5 }} key={index}>
        //     <Card.Header style={{backgroundColor: pokeColor(item)}} >{item.name}</Card.Header>
        //     <Card.Body>
        //     </Card.Body>
        //     <Card.Footer style={{backgroundColor: pokeColor(item), color: wordColor(item) }}>
        //         <div>
        //             <p>
        //                 Name: ${cart.name}
        //             </p>
        //             <p>
        //                 Price: ${cart.price}
        //             </p>
        //             <p>
        //                 Qty: {cart.quantity}
        //             </p>
        //         </div>
        //         <div>
        //             <Button onClick={() => addToCart()}
        //                 className="m-2"
        //                 variant="success"
        //             >
        //                 Add to Cart
        //             </Button>
        //         </div>
        //     </Card.Footer>
        // </Card >
    


    // If past orders have not loaded yet, show a loading screen icon
    if (!pastOrder) {
        return <LoadingScreen />
    }
    // if there isn't any "non-active/oders that have already been puchased", then display this message
    else if (pastOrder.length === 0) {
        return <p>Sorry, you dont have any past order.</p>
    }
    return (
        <div style={cardContainerStyle}>
            {itemCards}
        </div>
    )
}

export default OrderIndex
