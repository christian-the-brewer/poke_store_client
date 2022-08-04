import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import { updatePetSuccess, updatePetFailure } from '../shared/AutoDismissAlert/messages'

const EditPetModal = (props) => {
    const { 
        user, show, handleClose, 
        updatePet, msgAlert, triggerRefresh
    } = props

    const [pet, setPet] = useState(props.pet)

    console.log('pet in edit modal', pet)

    const handleChange = (e) => {
        setPet(prevPet => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPet,
                ...updatedPet
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updatePet(user, pet)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updatePetSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showPet component
            // updated is in ShowPet's useEffect's dependency array
            // changes to the updated boolean cause ShowPet's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updatePetFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PetForm 
                    pet={pet}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Pet"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal