import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneItem, updateItem, removeItem, updateStockItem } from '../../api/items'
import messages from '../shared/AutoDismissAlert/messages'
import EditItemModal from './EditItemModal'
import ItemForm from '../shared/ItemForm'
import StripeCheckout from 'react-stripe-checkout'
import { addToCart } from '../../api/carts'

// We need to get the item's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component


const ShowItem = (props) => {
    const [item, setItem] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert, updatedStock, triggerRefresh } = props
    console.log('user in props', user)
    console.log('the item in showItem', item)
    // destructuring to get the id value from our route parameters



    useEffect(() => {
        getOneItem(id)
            .then(res => { return setItem(res.data.item), console.log("this is res.data.item", res.data.item) })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting item',
                    message: messages.getItemsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [])

    // here we'll declare a function that runs which will remove the item
    // this function's promise chain should send a message, and then go somewhere
    const removeTheItem = () => {
        removeItem(user, item._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeItemSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => { navigate('/') })
            // on failure send a failure message
            .catch(err => {
                msgAlert({
                    heading: 'Error removing item',
                    message: messages.removeItemFailure,
                    variant: 'danger'
                })
            })
    }


    const addToTheCart = () => {
        console.log('user', user)
        addToCart(user, item)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeItemSuccess,
                    variant: 'success'
                })
            })

            .then(() => { navigate('/') })

            .catch(err => {
                msgAlert({
                    heading: 'Error adding to cart',
                    message: messages.removeItemFailure,
                    variant: 'danger'
                })
            })
    }

    if (!item) {
        return <LoadingScreen />
    }

    //changeQuantity() declaring callback function for setting state of the item quantity
    // will need the item to change the quantity of and the setter function passed through from props
    // call function before the set timeout and navigate to change quantity in state
    // do I want to make an api call to change the data in the db?
    // what kind of data do i need from the db?
    // how will i make this request from the db?
    // should this api call be inside this callback function or be a seperate function that preceeds it



    const changeQuantity = (item) => {
        // e.preventDefault()
        const updatedStock = item.stock - 1
        updateStockItem(item, updatedStock)
            .then(console.log('this is item and updated stock', item, updatedStock))
            // .then(() => triggerRefresh())
            .catch(() =>
                console.log('works')
            )
    }


    function handleToken(token, addresses) {
        changeQuantity(item)
        if (token) {
            msgAlert({
                heading: 'Success',
                message: messages.paymentSuccessful,
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }


    // function availability() {
    //     if (item.stock = 0) {
    //         return ('Out of Stock Sorry')
    //     } else {

    //     }
    // }


    return (
        <>
            <Container className="fluid">
                <Card >
                    <Card.Header style={{ backgroundColor: pokeColor(item), fontSize: '50px', fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Card.Header>
                    <Card.Body >
                        <img src={item.image} style={{ marginLeft: '35%' }} />
                        <Card.Text>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} >Type: {item.pokemonType.toLowerCase()} </p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Description: {item.description} </p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Cost: {item.cost} </p>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} > Stock: {item.stock} </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ backgroundColor: pokeColor(item) }}>
                        {

                            <>
                                <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                >
                                    Edit Item
                                </Button>
                                <Button onClick={() => removeTheItem()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete This Item
                                </Button>
                                <Button onClick={addToTheCart}
                                    className="m-2">
                                    Add To Cart
                                </Button>
                                <StripeCheckout
                                    stripeKey="pk_test_51LTtnNDtEn7Sojm7iPaYEA0jfQj07zxKZ92tb1ZrdFNZuI7ecXBKHuwGmIKi6JjNwE9pAPE8b23SN6KemYzLrNb600prbjUyDe"
                                    token={handleToken}
                                    billingAddress
                                    shippingAddress
                                    amount={item.cost * 100}
                                    label="Purchase Item"
                                    image={item.image}
                                    currency="USD"
                                />
                            </>


                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditItemModal
                user={user}
                item={item}
                show={editModalShow}
                updateItem={updateItem}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
        </>
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
    } else if (item.pokemonType.toLowerCase() === 'berries') {
        return 'fireBrick'
    } else if (item.pokemonType.toLowerCase() === 'pokeball') {
        return 'gold'
    } else if (item.pokemonType.toLowerCase() === 'general') {
        return 'honeyDew'
    }
}

const wordColor = function (item) {
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
    }
}

export default ShowItem