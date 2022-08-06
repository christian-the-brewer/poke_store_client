import ItemIndex from "./items/ItemIndex"

const Home = (props) => {
	const { msgAlert, user } = props
	//console.log('props in home', props)

	return (
		<>
			<h2 style={{textAlign: 'center', fontSize: '50px', fontWeight: 'bold'}} >All Products</h2>
			<ItemIndex
				msgAlert={msgAlert}
			/>
		</>
	)
}

export default Home
