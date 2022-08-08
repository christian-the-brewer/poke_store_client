import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneCart, updateCart } from '../../api/carts'
import messages from '../shared/AutoDismissAlert/messages'
import EditCartModal from './EditCartModal'


const ShowCart = (props) => {
    const [cart, setCart] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the cart in showCart', cart)


    useEffect(() => {
        getOneCart(user)
            .then(res => setCart(res.data.cart))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting cart',
                    message: messages.getCartsFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [])



    if (!cart) {
        return <LoadingScreen />
    }


    const cartProducts = cart.products.map((product, index) => (
        <li key={index}>{product.name}: ${product.cost}</li>
        
))
console.log(cart.products) 
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>Order</Card.Header>
                    <Card.Body>

                        <Card.Text>
                            <ul>
                                {cartProducts}
                            </ul>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {

                            <>
                                <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                >
                                    Edit Cart
                                </Button>

                            </>


                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditCartModal
                user={user}
                cart={cart}
                show={editModalShow}
                updateCart={updateCart}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowCart