import ItemIndex from "./items/ItemIndex"
// const linkStyle = {
// 	background-image: url(https://i.imgur.com/FX8j3Ee.png);,
//     background-repeat: no-repeat;,
//     background-attachment: 'fixed',
//     background-size: 'contain',
//     background-size: 'cover'
// }

const Home = (props) => {
	const { msgAlert } = props
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
