import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const PokeForm = (props) => {
    const { pet, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is your item's name?"
                    name="name"
                    id="name"
                    value={ item.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                    placeholder="What does this item look like?"
                    name="image"
                    id="image"
                    value={ item.image }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="cost">Cost</Form.Label>
                <Form.Control
                    placeholder="Whats the cost?"
                    type="number"
                    name="cost"
                    id="cost"
                    value={ item.cost }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Give a breif description"
                    name="description"
                    id="description"
                    value={ item.description }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PokeForm