import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from "./Orders"

//public api key from Stripe 
const promise = loadStripe("pk_test_51HVUjnGoaZfMFEGELMT8bSE5LYfGoq3gyQnMf7DuCpPgJ24enWxG6PJ7laB9SbBb3bD9quDIPNSNvlm45n4PYpy2009uHDAJH6");

function App() {
  const [{ }, dispatch] = useStateValue();

  //useEffect: will only run once when the app component loads
  useEffect(() => {

    //when app loads, this listener gets attached
    //will always fire when an authentication action happens
    auth.onAuthStateChanged(authUser => {  //gives authUser if exists
      console.log("USER IS >>>", authUser);

      if (authUser) {  //if user just/was logged in
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });


  }, [])
  //brackets contain useState variables, that refire this useEffect when they change
  //when left blank, useEffect will only fire once, upon component render


  return (
    <Router>

      {/* BEM */}
      <div className="app">

        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>


          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>


        </Switch>
      </div>

    </Router>
  );
}

export default App;
