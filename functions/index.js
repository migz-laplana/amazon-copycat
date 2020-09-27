const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { response } = require('express');
const stripe = require("stripe")("sk_test_51HVUjnGoaZfMFEGEXimcXZA5pdm8cQyszefFWqo1ePQrlj7z3bOv88QuxXFmRhGp60M88Fl51TevIGC4WOlN0rxT007dymuWRr");


//------APP CONFIG------
const app = express();


//-------MIDDLEWARE-------
app.use(cors({ origin: true }));
app.use(express.json());


//--------API ROUTES-------
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;
    console.log("Payment request received!!", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //in currency's sub-units (i.e. cents)
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});


//---------LISTENER-------
exports.api = functions.https.onRequest(app);


//http://localhost:5001/clone-laplana/us-central1/api