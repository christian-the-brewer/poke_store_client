import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneItem, updateItem, removeItem } from '../../api/items'
import messages from '../shared/AutoDismissAlert/messages'
import EditItemModal from './EditItemModal'
import ItemForm from '../shared/ItemForm'

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

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the item in showItem', item)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneItem(id)
            .then(res => setItem(res.data.item))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting item',
                    message: messages.getItemsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

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
        // console.log('cart')
        addToTheCart(item._id)
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
                    heading: 'Error removing item',
                    message: messages.removeItemFailure,
                    variant: 'danger'
                })
            })
    }

    if (!item) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card >
                    <Card.Header style={{ backgroundColor: pokeColor(item), fontSize: '50px', fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Card.Header>
                    <Card.Body >
                        <img src={item.image} style={{ marginLeft: '35%' }} />
                        <Card.Text>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }} >Type: {item.pokemonType} </p>
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
                                <Button onClick={() => addToTheCart()}
                                    className="m-2">
                                    Add To Cart
                                </Button>
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