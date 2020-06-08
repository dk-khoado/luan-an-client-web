$(document).ready(function () {
    options = {
        headers:
            { Authorization: "Bearer " + token }
    };
    var data = [];
    axios.post(BASE_URL + POST_MANANGER_API, data, options)
        .then(function (response) {
            // console.log(response.data.data_response[0].endpoint_action);
            const endpoint_action = response.data.data_response[0].endpoint_action;
            var { GET_ALL, GET_BY_ID, INSERT, UPDATE, DELETE } = endpoint_action;
            $("#getAll").text(GET_ALL);
            $("#getbyID").text(GET_BY_ID);
            $("#insertValue").text(INSERT);
            $("#updatebyID").text(UPDATE);
            $("#detelebyID").text(DELETE);
            $("#deletelAll").text(DELETE);

            //Lấy response từ endpoint_action
            $("#Run_GetAll").click(() => getValueAll(GET_ALL));
            $("#Run_GetbyID").click(() => getValuebyID(GET_BY_ID));
        })
        .catch(function (error) {
            console.log(error);
        });
});

function getValueAll(endpoint) {
    axios.post(BASE_URL + endpoint, [], options)
        .then(function(response) {
            var data = response.data;
            $("#getReponseGetAll").text(JSON.stringify(data));
        });
}

function getValuebyID(endpoint) {
    var number = 0;
    endpoint = endpoint.replace(":id", number);
    axios.post(BASE_URL + endpoint, [], options)
        .then(function(response) {
            console.log(response);
            var data = response.data;
            $("#getReponseGetbyID").text(JSON.stringify(data));
        });
}
