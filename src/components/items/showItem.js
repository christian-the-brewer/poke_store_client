import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOnePet, updatePet, removePet } from '../../api/pets'
import messages from '../shared/AutoDismissAlert/messages'
import EditPetModal from './EditPetModal'
import NewToyModal from '../toys/NewToyModal'
import ShowToy from '../toys/ShowToy'

// We need to get the pet's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the pet in showPet', pet)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting pet',
                    message: messages.getPetsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the pet
    // this function's promise chain should send a message, and then go somewhere
    const removeThePet = () => {
        removePet(user, pet.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePetSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing pet',
                    message: messages.removePetFailure,
                    variant: 'danger'
                })
            })
    }
    let toyCards
    if (pet) {
        if (pet.toys.length > 0) {
            toyCards = pet.toys.map(toy => (
                <ShowToy 
                    key={toy._id}
                    toy={toy}
                    pet={pet}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!pet) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ pet.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { pet.age }</small></div>
                            <div><small>Type: { pet.type }</small></div>
                            <div><small>
                                Adoptable: { pet.adoptable ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setToyModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {pet.name} a toy!
                        </Button>
                        {
                            pet.owner && user && pet.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Pet
                                </Button>
                                <Button onClick={() => removeThePet()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Set {pet.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {toyCards}
            </Container>
            <EditPetModal 
                user={user}
                pet={pet} 
                show={editModalShow} 
                updatePet={updatePet}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewToyModal 
                pet={pet}
                show={toyModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setToyModalShow(false)} 
            />
        </>
    )
}

export default ShowPet