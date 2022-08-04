import {
    Form,
    Button,
    Container
} from 'react-bootstrap'

const ItemForm = (props) => {
    const { item, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is this item's name?"
                    name="name"
                    id="name"
                    value={item.name}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                    placeholder="Image URL"
                    name="image"
                    id="image"
                    value={item.image}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="cost">Cost</Form.Label>
                <Form.Control
                    placeholder="Enter the items value"
                    type="number"
                    name="cost"
                    id="cost"
                    value={item.cost}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Give a brief description"
                    name="description"
                    id="description"
                    value={item.description}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="pokemonType">Type</Form.Label>
                <Form.Control
                    placeholder="What is this items type?"
                    name="pokemonType"
                    id="pokemonType"
                    value={item.pokemonType}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="stock">Stock</Form.Label>
                <Form.Control
                    placeholder="How many are available?"
                    name="stock"
                    id="stock"
                    value={item.stock}
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ItemForm