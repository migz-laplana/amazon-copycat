import axios from "axios";

const baseURL = ("https://us-central1-clone-laplana.cloudfunctions.net/api" || "");
// ("http://localhost:5001/clone-laplana/us-central1/api" 
const instance = axios.create({

    //baseURL is the base api address of your requests
    baseURL: baseURL //the API (cloud function) URL
});

export default instance