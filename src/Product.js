import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {

    //using data layer (context api)
    const [{ basket }, dispatch] = useStateValue();
    console.log(basket);
    const addToBasket = () => {
        //dispatch item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title, title,
                image: image,
                price: price,
                rating: rating
            }
        });
    }

    return (
        <div className="product">
            {/* <h1>im a product component</h1> */}
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small><strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <span role="img" aria-label="star rating">⭐</span>
                        ))
                    }
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
