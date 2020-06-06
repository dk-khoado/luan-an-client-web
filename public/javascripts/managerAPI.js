function ItemAPICompoment(name, endpoint) {
    return ` <tr>
    <td onclick="setValue('${name}', '${endpoint}')" style="cursor: pointer;">${name}</td>
    <td>  #  </td>
    <td>
        <a class="btn btn-success btn-sm" href="/manager/detailapi">View</a>
        <button class="btn btn-primary btn-sm">Edit</button>
        <button class="btn btn-secondary btn-sm" data-toggle="modal"
            data-target="#delete">Delete</button>
    </td>
</tr>`
}
options = {
    headers: { Authorization: "Bearer " + token }
};
var data = [];
axios.post(BASE_URL + POST_MANANER_API, data, options)
    .then(function(response) {
        data = response.data.data_response;
        data.forEach(element => {
            $('#apiList').append(ItemAPICompoment(element.table_name, element._id));
            // console.log(element);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

function setValue(name, id) {
    $('#title').hide();

    $("#getAll").prop("disabled", false);
    $("#getbyID").prop("disabled", false);
    $("#deleteAll").prop("disabled", false);
    $("#deletebyID").prop("disabled", false);


    $("#name").text(name);

    $("#getAll").unbind('click');
    $("#getbyID").unbind('click');

    var endpoint = data.find(v => v._id == id);
    $("#getAll").click(() => getValueAll(endpoint.endpoint_action.GET_ALL));
    $("#getbyID").click(() => getValueByID(endpoint.endpoint_action.GET_BY_ID));
    $("#deleteAll").click(() => deleteValueAll(endpoint.endpoint_action.DELETE));
    $("#deletebyID").click(() => deleteValueByID(endpoint.endpoint_action.DELETE));
}



function getValueAll(endpoint) {
    axios.post(BASE_URL + endpoint, [], options)
        .then(function(response) {
            console.log(response);
            showButtonwithTable();
        });

}

function getValueByID(endpoint) {
    var number = $("#NumberID").val();
    endpoint = endpoint.replace(":id", number);
    console.log(endpoint);
    axios.post(BASE_URL + endpoint, [], options)
        .then(function(response) {
            // console.log(response);
            showButtonwithTable();
        });
}

function deleteValueAll(endpoint) {
    axios.post(BASE_URL + endpoint, {
            "id": -1,
            "deleteForever": "true"
        }, options)
        .then(function(response) {
            // console.log(response);
            showButtonwithTable();
        });
}

function deleteValueByID(endpoint) {
    var number = $("#RemoveID").val();
    axios.post(BASE_URL + endpoint, {
            "id": number,
            "deleteForever": "true"
        }, options)
        .then(function(response) {
            console.log(response);
            console.log("DELETE BY ID SUCCESS");
            showButtonwithTable();
        });
}

function showButtonwithTable() {
    $('#title').show();
}
