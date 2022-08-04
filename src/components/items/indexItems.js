import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllItems } from '../../api/items'
import messages from '../shared/AutoDismissAlert/messages'

// ItemsIndex should make a request to the api
// To get all items
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ItemsIndex = (props) => {
    const [items, setItems] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in ItemsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllItems()
            .then(res => setItems(res.data.items))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getItemsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If items haven't been loaded yet, show a loading message
    if (!items) {
        return <LoadingScreen />
    } else if (items.length === 0) {
        return <p>No items yet. Better add some.</p>
    }

    const itemCards = items.map(item => (
        <Card style={{ width: '30%', margin: 5}} key={ item.id }>
            <Card.Header>{ item.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/items/${item.id}`}>View { item.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { itemCards }
        </div>
    )
}

export default ItemsIndex