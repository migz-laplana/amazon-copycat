import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Login.css"
import { auth } from "./firebase";


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push("/")
            })
            .catch(error => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {   //on successful creation
                console.log(auth);
                if (auth) {
                    history.push("/")  //redirect
                }
            })
            .catch(error => alert(error.message))  //.catch for error-handling
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://media.istockphoto.com/vectors/ecommerce-linear-icon-modern-o
                utline-ecommerce-logo-concept-on-white-vector-id1130927799" alt="brand-logo" />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>

                <form action="">
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button
                        className="login__signInButton"
                        type="submit"
                        onClick={signIn}>
                        Sign In</button>
                </form>
                <p>
                    By signing-in you agree to the AMAZON-STYLE E-COMMERCE APPLICATION Conditions of Use and Sale.
                    Please see our Privacy Notice, our Cookies Notice and our Interest-based Ads Notice.
                </p>
                <button className="login__registerButton"
                    onClick={register}
                >Create Account</button>
            </div>
        </div>
    )
}

export default Login
