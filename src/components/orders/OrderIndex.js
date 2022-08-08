import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllOrders } from '../../api/orders'
import messages from '../shared/AutoDismissAlert/messages'



const OrderIndex = (props) => {
    // Declare a new state variable, which we'll call `order` that will show all orders
    const [order, showAllOrders] = useState(null)
    // Declare a new state variable, which we'll call `error` that will set error if orders failed to be fetched
    const [error, setError] = useState(false)
    // destruct msgAlert properites from props object
    const { msgAlert } = props


    useEffect(() => {
        // get all orders from orders api
        getAllOrders()
            // then from the promised response, get carts object from the cart collection
            .then(res => showAllOrders(res.data.cart))
            // cart is an object that has a properties of products and owners
            console.log("this is cart:", cart)
            // if the promised data is not returned then catch error
import { getAllItems } from '../../api/items'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ItemIndex = (props) => {
    const [items, setItems] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    //console.log('Props in ItemIndex', props)

    useEffect(() => {

        getAllItems()
            .then(res => setItems(res.data.items))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getItemsFailure,
                    variant: 'danger',
                })
                console.log(err)
                 // if orders failed to be fetched, then set error to true
                setError(true)
            })
    }, [])
    // after set error is true render Error message
              
                console.log(err)
                setError(true)
            })
    }, [])

    const addToCart = () => {

    }

    if (error) {
        return <p>Error!</p>
    }

    // 2. filter `cart` by non-active orders to get all the past orders(orders that have already been purchased)
        // cart is an object that have an active boolean property
    // const pastOrder = cart.filter() {

    // }
     // the active orders are still inside the cart 
    // we are filtering the non active oders- filter()







    // If past orders have not loaded yet, show a loading screen icon
    if (!pastOrder) {
        return <LoadingScreen />
    } 
    // if there isn't any "non-active/oders that have already been puchased", then display this message
    else if (pastOrder.length === 0) {
        return <p>Sorry, you dont have any past order.</p>
    }

    // const itemCards = items.map((item, index) => (
    //     <Card style={{ width: '30%', margin: 5 }} key={index}>
    //         <Card.Header style={{backgroundColor: pokeColor(item)}} >{item.name}</Card.Header>
    //         <Card.Body>
    //             <Link to={`/items/${item._id}`}><img src={item.image} alt={item.name}></img></Link>
    //         </Card.Body>
    //         <Card.Footer style={{backgroundColor: pokeColor(item), color: wordColor(item) }}>
    //             <div>
    //                 <p>
    //                     Price: ${item.cost}
    //                 </p>
    //                 <p>
    //                     Qty: {item.stock}
    //                 </p>
    //             </div>
    //             <div>
    //                 <Button onClick={() => addToCart()}
    //                     className="m-2"
    //                     variant="success"
    //                 >
    //                     Add to Cart
    //                 </Button>
    //             </div>
    //         </Card.Footer>
    //     </Card >
    // ))

    // return (
    //     <div style={cardContainerStyle}>
    //         {itemCards}
    //     </div>
    // )
}


export default OrderIndex
    // If items haven't loaded yet
    if (!items) {
        return <LoadingScreen />
    } else if (items.length === 0) {
        return <p>Sorry, the Poke Mart is sold out of everything.</p>
    }

    const itemCards = items.map((item, index) => (
        <Card style={{ width: '30%', margin: 5 }} key={index}>
            <Card.Header style={{backgroundColor: pokeColor(item)}} >{item.name}</Card.Header>
            <Card.Body>
                <Link to={`/items/${item._id}`}><img src={item.image} alt={item.name}></img></Link>
            </Card.Body>
            <Card.Footer style={{backgroundColor: pokeColor(item), color: wordColor(item) }}>
                <div>
                    <p>
                        Price: ${item.cost}
                    </p>
                    <p>
                        Qty: {item.stock}
                    </p>
                </div>
                <div>
                    <Button onClick={() => addToCart()}
                        className="m-2"
                        variant="success"
                    >
                        Add to Cart
                    </Button>
                </div>
            </Card.Footer>
        </Card >
    ))

    return (
        <div style={cardContainerStyle}>
            {itemCards}
        </div>
    )
}

const pokeColor = function (item) {
    if (item.pokemonType.toLowerCase() === 'fire') {
        return 'crimson'
    } else if (item.pokemonType.toLowerCase() === 'grass') {
       return 'lawnGreen'
    } else if (item.pokemonType.toLowerCase() === 'water') {
        return 'royalBlue'
    } else if (item.pokemonType.toLowerCase() === 'bug') {
        return 'sandyBrown'
    } else if (item.pokemonType.toLowerCase() === 'flying') {
        return 'skyBlue'
    } else if (item.pokemonType.toLowerCase() === 'normal') {
        return 'silver'
    } else if (item.pokemonType.toLowerCase() === 'poison') {
        return 'orchid'
    } else if (item.pokemonType.toLowerCase() === 'electric') {
        return 'yellow'
    } else if (item.pokemonType.toLowerCase() === 'ground') {
        return 'peru'
    } else if (item.pokemonType.toLowerCase() === 'fairy') {
        return 'deepPink'
    } else if (item.pokemonType.toLowerCase() === 'fighting') {
        return 'orangeRed'
    }
}

const wordColor = function (item) {
    if (item.pokemonType.toLowerCase() === 'fire') {
        return 'blue'
    } else if (item.pokemonType.toLowerCase() === 'grass') {
       return 'black'
    } else if (item.pokemonType.toLowerCase() === 'water') {
        return 'black'
    } else if (item.pokemonType.toLowerCase() === 'bug') {
        return 'black'
    } else if (item.pokemonType.toLowerCase() === 'flying') {
        return 'black'
    } else if (item.pokemonType.toLowerCase() === 'normal') {
        return 'black'
    } else if (item.pokemonType.toLowerCase() === 'poison') {
        return 'black'
    } else if (item.pokemonType.toLowerCase() === 'electric') {
        return 'black'
    } else if (item.pokemonType.toLowerCase() === 'ground') {
        return 'black'
    }
}

export default ItemIndex
