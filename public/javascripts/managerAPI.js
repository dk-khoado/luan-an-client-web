
function ItemAPICompoment(name, endpoint) {
    return ` <tr>
    <td onclick="setValue('${name}', '${endpoint}')" style="cursor: pointer;">${name}</td>
    <td>  #  </td>
    <td>
        <a class="btn btn-success btn-sm" href="/manager/api/detail/${name}">View</a>
        <button class="btn btn-info btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm" data-toggle="modal"
            data-target="#delete" onclick="ComfirmDeleteAPI('${name}')">Delete</button>
    </td>
</tr>`
}
options = {
    headers: { Authorization: "Bearer " + token }
};
var data = [];
axios.post(BASE_URL + POST_MANANGER_API, data, options)
    .then(function(response) {
        data = response.data.data_response;
        data.forEach(element => {
            $('#apiList').append(ItemAPICompoment(element.table_name, element._id));
            // console.log(data);
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
    $("#deleteAll").unbind('click');
    $("#deletebyID").unbind('click');


    var endpoint = data.find(v => v._id == id);
    $("#getAll").click(() => getValueAll(endpoint.endpoint_action.GET_ALL));
    $("#getbyID").click(() => getValueByID(endpoint.endpoint_action.GET_BY_ID));
    $("#deleteAll").click(() => deleteValueAll(endpoint.endpoint_action.DELETE));
    $("#deletebyID").click(() => deleteValueByID(endpoint.endpoint_action.DELETE));
}


function getValueAll(endpoint) {
    axios.post(BASE_URL + endpoint, [], options)
        .then(function(response) {
            var data = response.data;
            console.log("GET VALUE ALL SUCCESS");
            showButtonwithTable();
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponse").text(textJson);
        });

}

function getValueByID(endpoint) {
        var number = $("#NumberID").val();
        if (number == null || number == "") {
            alert("Vui lòng nhập vào");
            return false;
        } 
        endpoint = endpoint.replace(":id", number);
    axios.post(BASE_URL + endpoint, [], options)
        .then(function(response) {
            console.log("GET VALUE BY ID SUCCESS");
            showButtonwithTable();
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponse").text(textJson);
        });
}

function deleteValueAll(endpoint) {
    axios.post(BASE_URL + endpoint, {
            "id": -1,
            "deleteForever": "true"
        }, options)
        .then(function(response) {
            console.log("DELETE ALL SUCCESS");
            showButtonwithTable();
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponse").text(textJson);
        });
}

function deleteValueByID(endpoint) {
    var number = $("#RemoveID").val();
    if (number == null || number == "") {
        alert("Vui lòng nhập vào");
        return false;
    } 
    axios.post(BASE_URL + endpoint, {
            "id": number,
            "deleteForever": "true"
        }, options)
        .then(function(response) {
            console.log("DELETE BY ID SUCCESS");
            showButtonwithTable();
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponse").text(textJson);
        });
}

function showButtonwithTable() {
    $('#title').show();
}


function removeAPI(table_name)
{
    axios.post(BASE_URL + POST_DELETE_API,{
        table_name: table_name
    }, options)
    .then(function(response) {
        location.reload();
    });
    
}
function ComfirmDeleteAPI(table_name){
    $("#ConfirmDelete").unbind("click");
    $("#ConfirmDelete").click(() => removeAPI(table_name));
  
}