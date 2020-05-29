import { response } from "express";

options = {
    headers:
        { Authorization: "Bearer " + token }
};
var data = {}
axios.post(BASE_URL + POST_API, data, options)
    .then(function (response) {
        
    })
    .catch(function (error) {
        console.log(error);
    });