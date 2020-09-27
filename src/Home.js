import React from 'react'
import "./Home.css"
import Product from './Product'


function Home() {
    return (
        <div className="home">
            {/* <h1>I am the Home!</h1> */}
            <div className="home__container">
                <img className="home__image" src="https://www.sirsdigitalcommerce.com/uploads/1/0/1/5/101585986/amazon-header-image2_orig.png" alt="" />

                <div className="home__row">
                    <Product
                        id={23454545}
                        title="Harry Pota"
                        price={111}
                        image="https://kbimages1-a.akamaihd.net/70ee63f2-8c0a-48e6-8058-60d8cc633641/1200/1200/False/harry-potter-and-the-goblet-of-fire-6.jpg"
                        rating={5}
                    />
                    <Product
                        id={4545345}
                        title="Fire 7 Kids Edition Tablet, 7&quot; Display, 16 GB, Blue Kid-Proof Case"
                        price={30}
                        image="https://images-na.ssl-images-amazon.com/images/I/61Uac7GB8vL._AC_SY300_.jpg"
                        rating={5}
                    />

                </div>
                <div className="home__row">
                    <Product
                        id={6656565}
                        title="Hanes Men's Ecosmart Fleece Sweatshirt"
                        price={12.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/81Of4J0bA9L._AC_UL320_SR272,320_.jpg"
                        rating={5}
                    />
                    <Product
                        id={345678}
                        title="Bridge of Death"
                        price={12.50}
                        image="https://preview.redd.it/lr9lhx0wp4n41.jpg?width=2048&format=pjpg&auto=webp&s=9f2d60378ff93d978cd722514404a00145838643"
                        rating={2}
                    />
                    <Product
                        id={75753456}
                        title="Plawers"
                        price={5.99}
                        image="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2015/11/10/0/CI_Costa-Farms-Ballad-aster.jpg.rend.hgtvcom.616.411.suffix/1447169929799.jpeg"
                        rating={4}
                    />

                </div>
                <div className="home__row">
                    {/* product */}
                </div>
            </div>
        </div>
    )
}

export default Home
