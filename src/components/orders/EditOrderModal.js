import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CartForm from './OrderIndex'

import { updateCartSuccess, updateCartFailure } from '../shared/AutoDismissAlert/messages'

const EditCartModal = (props) => {
    const {
        user, show, handleClose,
        updateCart, msgAlert, triggerRefresh
    } = props

    const [cart, setCart] = useState(props.cart)

    console.log('cart in edit modal', cart)
    console.log('user in edit modal', user)

    const handleChange = (e) => {
        setCart(prevCart => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            // console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // // this handles the checkbox, changing on to true etc
            // if (updatedName === "adoptable" && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === "adoptable" && !e.target.checked) {
            //     updatedValue = false
            // }

            const updatedCart = {
                [updatedName]: updatedValue
            }
            return {
                ...prevCart,
                ...updatedCart
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        console.log("this is user in update", user)
        console.log("this is cart in update", cart)
        updateCart(user, cart)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateCartSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: updateCartFailure,
                    variant: 'danger'
                })
            )
    }

    const products = cart.products.map((product, index) => {
        <li key={index}>{product.name}: {product.price}</li>
    })

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CartForm
                    products={products}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Cart"

                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCartModal



