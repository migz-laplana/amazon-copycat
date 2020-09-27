import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
import FlipMove from "react-flip-move"

function Checkout() {
    const [state, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1edAuVRr0gK0jSZFnXXbRRXXa.jpg" className="checkout__ad" alt="" />
                <div>
                    <h3>Hello, {state.user?.email ? state.user?.email : "Guest"}</h3>
                    <h2 className="checkout__title">
                        Your shopping basket
                    </h2>
                    <FlipMove>

                        {state.basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </FlipMove>
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
