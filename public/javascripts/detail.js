
options = {
    headers:
        { Authorization: "Bearer " + token }
};
var data = [];
axios.post(BASE_URL+POST_API, data, options)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

