import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider'
import axios from "./axios"
import { db } from "./firebase"

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();  //data layer
    const history = useHistory();

    //Stripe stuff
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    // note: need to get a "client secret" from stripe before
    //       sending payment to stripe, so we make state variable "clientSecret"
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate stripe secret to charge customers
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                //stripe needs "total" param to be in cents/centavos/etc
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();

        //basket as dependency bec: new basket tot price = new secret
    }, [basket]);


    const handleSubmit = async e => {
        e.preventDefault();

        //Stripe handling:
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            db
                .collection("users") //make collection
                .doc(user?.uid) //create doc with name
                .collection("orders") //give the doc a sub-coll
                .doc(paymentIntent.id) //create doc with name
                .set({ //finally set:
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created

                })

            //set corresponding state variables accordingly:
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: "EMPTY_BASKET"
            });

            history.replace("/orders");
        })
    }

    const handleChange = e => {
        //card input field error handling:
        setDisabled(e.empty); //launch setDisabled only if e.empty is true
        setError(e.error ? e.error.message : ""); //do stuff if e.error is true


    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
            </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>B21 L555 Dope St.</p>
                        <p>Mars, Milky Way</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {/* all basket products */}
                        {basket.map(basketItem => (
                            <CheckoutProduct
                                id={basketItem.id}
                                title={basketItem.title}
                                image={basketItem.image}
                                price={basketItem.price}
                                rating={basketItem.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">

                        {/* stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                {/* disabled will be true if one of the functions is bool true */}
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
