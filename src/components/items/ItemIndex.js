import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
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
            <Card.Header>{item.name}</Card.Header>
            <Card.Body>
                <Link to={`/items/${item._id}`}><img src={item.image} alt={item.name}></img></Link>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {itemCards}
        </div>
    )
}

export default ItemIndex