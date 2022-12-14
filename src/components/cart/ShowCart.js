import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneCart, updateCart, checkoutSuccess, removeFromCart } from '../../api/carts'
import messages from '../shared/AutoDismissAlert/messages'
import EditCartModal from './EditCartModal'
import StripeCheckout from 'react-stripe-checkout'


const ShowCart = (props) => {
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(0)
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
            // .then(updateCartTotal(cart))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting cart',
                    message: messages.getCartsFailure,
                    variant: 'danger'
                })
                navigate('/')
            })
    }, [])



    function handleToken(token, addresses) {
        if (token) {
            checkoutSuccess(user, cart._id)
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

    const updateCartTotal = async (cart) => {
        let sum = 0
        await cart.products.forEach(product => {
            sum += product.cost
        })
        setTotal(sum)
        return sum
    }


    const removeFromTheCart = (user, cartId, productId) => {
        removeFromCart(user, cartId, productId)


    }

    if (!cart) {
        return <LoadingScreen />
    }




    const cartProducts = cart.products.map((product, index) => (
        <>
            <li key={index}>{product.name}: ${product.cost}</li>
            <Button onClick={() => { removeFromTheCart(user, cart._id, product); navigate('/') }}
                className="m-2"
                variant="danger"
            >
                Delete This Item
            </Button>
        </>

    ))
    console.log(cart.products)
    return (
        <div className='cart'>
            <Container className="fluid">
                <Card>
                    <Card.Header>Order</Card.Header>
                    <Card.Body>

                        <Card.Text>
                            <ul>
                                {cartProducts}
                            </ul>
                            <p>Total: ${total}</p>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {

                            <>

                                <StripeCheckout
                                    stripeKey={process.env.STRIPE_API_TOKEN}
                                    token={handleToken}
                                    billingAddress
                                    shippingAddress
                                    amount={updateCartTotal(cart) * 100}
                                    label="Purchase Items"
                                    currency="USD"
                                />

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
        </div>
    )
}

export default ShowCart