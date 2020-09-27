import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './Reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {

    const history = useHistory();
    const [state, dispatch] = useStateValue();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            {/* -----------HOMEWORK--------- */}
                            Subtotal ({state.basket?.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order
                                contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(state.basket)}
                // value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
            />
            <button onClick={e => history.push("/payment")}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
