import { useState, useEffect } from 'react'
import {  Card } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'

import { getAllOrders } from '../../api/orders'

import messages from '../shared/AutoDismissAlert/messages'
// import { CardExpiryElement } from '@stripe/react-stripe-js'


const OrderIndex = (props) => {
    // Declare a new state variable, which we'll call `order` that will show all orders
    const [showAllOrders,setShowAllOrders] = useState([])
    // Declare a new state variable, which we'll call `error` that will set error if orders failed to be fetched
    const [error, setError] = useState(false)
    // destruct msgAlert properites from props object
    const { msgAlert, user} = props
    // const carts = [{name: "mh", price: 34, id:1}, {name: "rh", price: 34, id:2}, {name: "dh", price: 34, id:3}]
    console.log("this is user",user)
    useEffect(function () {
       async function getMyOrders() {
        const allOrders = await getAllOrders(user)
        console.log("this is allorders", allOrders)
       }
       getMyOrders()
        // console.log(getAllOrders)
        // then from the promised response, get carts object from the cart collection
        // carts is an object that has a properties of products and owners
            // .then(res => setShowAllOrders(res.data.carts)
                
            // )
            // console.log("this is cart:", showAllOrders)
            // if the promised data is not returned then catch error
            // .catch(err => {
            //     msgAlert({
            //         heading: 'Error Getting Items',
            //         message: messages.getItemsFailure,
            //         variant: 'danger',
            //     })
            //     console.log(err)
            //     setError(true)
            // })
            // get all orders from orders api
        }, [])
        

    // after set error is true render Error message
    if (error) {
        return <p>Error!</p>
    }

    // 2. filter `cart` by non-active orders to get all the past orders(orders that have already been purchased)
        // carts are object that have an active boolean property
        // the active orders are still inside the cart 
    // console.log("this is the showallorders",showAllOrders)
    // we are filtering the non active oders- filter()
    // const pastOrders = showAllOrders.filter((cart) => cart.active === false)
    // setShowAllOrders(pastOrders)
    
    // console.log(showAllOrders)
    // store showAllorders inside a variable
    // cart is an object of order
    // const orderCards = showAllOrders.map(cart => (
    //     <Card style={{ width: '30%', margin: 5}} key={ cart.id}>
    //         {/* <Card.Header>{ cart.name }</Card.Header> */}
    //         <Card.Body>
    //             <Card.Text>
    //                 <> { cart.cost }</>
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // ))

    // console.log('this is the ordercart loop', orderCards)
    // // If past orders have not loaded yet, show a loading screen icon
    // if (!showAllOrders) {
    //     return <LoadingScreen />
    // }
    // // // if there isn't any "non-active/oders that have already been puchased", then display this message
    // else if (showAllOrders.length=== 0) {
    //     return <p>Sorry, you dont have any past order.</p>
    // }
    return (
        <div >
        {/* { orderCards } */}
        </div>
    )
}

export default OrderIndex
// import React from 'react'

// function orderindex() {
//   return (
//     <div>this is the route</div>
//   )
// }

// export default orderindex