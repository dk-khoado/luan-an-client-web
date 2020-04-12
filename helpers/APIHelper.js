const axios = require('axios').default;
const BASE_URL = require('./APIs').BASE_URL;

const connect = async function (url = "", data = {}, token = "") {
    let options = {};
    if (token) {
        options = {
            headers:
                { Authorization: "Bearer " + token }
        };
    }
    console.log(options);
    try {
        let reponse = await axios.post(BASE_URL + url, data, options);

        if (reponse.status == 401) {
            return null;
        }
        return reponse.data;
    } catch (error) {
        return null;
    }
}

module.exports = connect;

