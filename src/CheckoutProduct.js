import React, { forwardRef } from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider'

// function CheckoutProduct({ id, image, title, price, rating, hideButton }) {

//     const [state, dispatch] = useStateValue();

//     const removeFromBasket = () => {
//         // remove item from basket
//         dispatch({
//             type: "REMOVE_FROM_BASKET",
//             id: id
//         })
//     }

//     return (
//         <div className="checkoutProduct">
//             <img className="checkoutProduct__image"
//                 src={image} alt="product-image" />
//             <div className="checkoutProduct__info">
//                 <p className="checkoutProduct__title">{title}</p>
//                 <p className="checkoutProduct__price">
//                     <small>$</small>
//                     <strong>{price}</strong>
//                 </p>
//                 <div className="product__rating">
//                     {/* Make an array "Array", fill it with value of "rating", then .map() */}
//                     {Array(rating)
//                         .fill()
//                         .map((_, i) => (
//                             <span role="img" aria-label="star rating">⭐</span>
//                         ))
//                     }
//                 </div>
//                 <button onClick={removeFromBasket}>Remove from Basket</button>
//             </div>
//         </div>
//     )
// }


const CheckoutProduct = forwardRef(({ id, image, title, price, rating, hideButton }, ref) => {


    const [state, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove item from basket
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        })
    }

    return (

        <div className="checkoutProduct" ref={ref}>
            <img className="checkoutProduct__image"
                src={image} alt="product-image" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {/* Make an array "Array", fill it with value of "rating", then .map() */}
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <span role="img" aria-label="star rating">⭐</span>
                        ))
                    }
                </div>
                {!hideButton &&
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                }
            </div>
        </div>
    )

})




export default CheckoutProduct
