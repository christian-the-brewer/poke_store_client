import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
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
                // console.log("here is get all items", getAllItems())
                console.log(err)
                setError(true)
            })
    }, [])

    const addToCart = () => {

    }

    if (error) {
        return <p>Error!</p>
    }

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