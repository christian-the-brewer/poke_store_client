// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
// import axios from "axios"
// import React, { useState } from 'react'




// export default function PaymentForm() {
//     const [success, setSuccess ] = useState(false)
//     const stripe = useStripe()
//     const elements = useElements()


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: "card",
//             card: elements.getElement(CardElement)
//         })


//     if(!error) {
//         try {
//             const {id} = paymentMethod
//             const response = await axios.post("http://localhost:3000/payment", {
//                 amount: 1000,
//                 id
//             })

//             if(response.data.success) {
//                 console.log("Successful payment")
//                 setSuccess(true)
//             }

//         } catch (error) {
//             console.log("Error", error)
//         }
//     } else {
//         console.log(error.message)
//     }
// }

//     return (
//         <>
//         {!success ? 
//         <form onSubmit={handleSubmit}>
//             <fieldset className="FormGroup">
//                 <div className="FormRow">
//                     <CardElement/>
//                 </div>
//             </fieldset>
//             <button>Pay</button>
//         </form>
//         :
//        <div>
//            <h2>Test Purchase</h2>
//        </div> 
//         }
            
//         </>
//     )
// }