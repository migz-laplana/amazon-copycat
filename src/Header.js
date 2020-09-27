import React from 'react'
import "./Header.css"

import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";

function Header() {
    //using data layer (context api)
    const [state, dispatch] = useStateValue();

    const handleAuth = () => {
        if (state.user) {
            auth.signOut();  //firebase method to sign out
        }
    }

    return (
        <div className="header">
            <Link to="/">

                <img className="header__logo"
                    src="https://i.insider.com/539f3ffbecad044276726c01?width=1100&format=jpeg&auto=webp"
                    alt="amazon-logo" />
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={!state.user && "/login"}>  {/* only redirect to /login if NO user*/}
                    <div className="header__option" onClick={handleAuth}>
                        <span className="header__optionLineOne">
                            Hello, {state.user ? state.user.email : "Guest"}
                        </span>
                        <span className="header__optionLineTwo">{state.user ? "Sign Out" : "Sign in"}</span>
                    </div>
                </Link>

                <Link to={"/orders"}>
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">Orders</span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingCartIcon />
                        <span className="header__optionLineTwo header__basketCount">
                            {state.basket?.length}  {/* ? for error chaining: graceful handling of errors*/}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
