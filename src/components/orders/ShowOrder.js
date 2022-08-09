// import { useState, useEffect } from 'react'

// import { useParams, useNavigate } from 'react-router-dom'

// import { Container, Card, Button } from 'react-bootstrap'

// import LoadingScreen from '../shared/LoadingScreen'
// import { getOneOrder, removeOrder } from '../../api/orders'
// import messages from '../shared/AutoDismissAlert/messages'
// import EditOrderModal from './EditOrderModal'


// const ShowOrder = (props) => {
//     const [cart, setCart] = useState(null)
//     const [editModalShow, setEditModalShow] = useState(false)
//     const [updated, setUpdated] = useState(false)
//     const [active, setActive] = useState(false);


//     const { id } = useParams()
//     const navigate = useNavigate()

//     const { user, msgAlert } = props
//     console.log('user in props', user)
//     console.log('the cart in showCart', cart)


//     useEffect(() => {
//         getOneOrder(id)
//             .then(res => {
//                 setCart(res.data.cart)
//                 if (res.data.cart.active === true) {
//                     const orderProducts = cart.products.map((product, index) => (
//                         <ul>        
//                             <li key={index}>{product.name}: {product.price}</li>
                            
//                             <li key={index}>{product.quantity}</li>
//                         </ul>
//                     ))
//                 }
//                 if (res.data.cart.active === false){
//                     // redirect to a signin page
//                 }
//             })
//             .catch(err => {
//                 msgAlert({
//                     heading: 'Error getting past order',
//                     message: messages.getOrdersFailure,
//                     variant: 'danger'
//                 })
//                 navigate('/')

//             })
//     }, [updated])

//     if (!cart) {
//         return <LoadingScreen />
//     }

//     return (
//         <>
//             <Container className="fluid">
//                 <Card>
//                     <Card.Header>Order</Card.Header>
//                     <Card.Body>
//                         <Card.Text>
//                                 {orderProducts}
//                         </Card.Text>
//                     </Card.Body>
//                     <Card.Footer>
//                         {
//                             <>
//                                 <Button onClick={() => setEditModalShow(true)}
//                                     className="m-2"
//                                     variant="warning"
//                                 >
//                                     Delete Order
//                                 </Button>

//                             </>
//                         }
//                     </Card.Footer>
//                 </Card>
//             </Container>
//             <EditCartModal
//                 user={user}
//                 cart={cart}
//                 show={editModalShow}
//                 removeOrder={removeOrder}
//                 msgAlert={msgAlert}
//                 triggerRefresh={() => setUpdated(prev => !prev)}
//                 handleClose={() => setEditModalShow(false)}
//             />
//         </>
//     )
// }

// export default ShowOrder