var properties = [];
$(document).ready(function () {
    options = {
        headers:
            { Authorization: "Bearer " + token }
    };


    axios.post(BASE_URL + POST_DETAIL_API, {
        "table_name": table_name
    }, options)
        .then(function (response) {
            var data_response = response.data.data_response;
            properties = data_response.properties;
            var { GET_ALL, GET_BY_ID, INSERT, UPDATE, DELETE } = data_response.endpoint_action;
            $("#table_name").text(data_response.properties.table_name);

            //Hiên thị tên các API 
            $("#getAll").text(GET_ALL);
            $("#getbyID").text(GET_BY_ID);
            $("#insertValue").text(INSERT);
            $("#updatebyID").text(UPDATE);
            $("#detelebyID").text(DELETE);
            $("#deletelAll").text(DELETE);

            //Lấy response từ endpoint_action
            $("#Run_GetAll").click(() => getAllValue(GET_ALL));
            $("#Run_InsertValue").click(() => InsertField());
            $("#Run_UpdatebyID").click(() => UpdatebyID());
            $("#Run_DeleteAll").click(() => getDeleteAll(DELETE));

            //Modal click Run
            $("#form-getbyID-run").click(() => getValuebyID(GET_BY_ID));
            $("#form-insert-run").click(() => InsertValue(INSERT));
            $("#form-Update-run").click(() => UpdateValuebyID(UPDATE));
            
            //Refresh GetByID
            $("#Run_GetbyID").click(() => RefreshgetbyID());
            
        })
        .catch(function (error) {
           
        });
});

function getAllValue(endpoint) {
    axios.post(BASE_URL + endpoint, [], options)
        .then(function (response) {
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponseGetAll").text(textJson);
        });
}

function getValuebyID(endpoint) {

    var number = $("#NumberID").val();
    if (number == null || number == "") {
        alert("Vui lòng nhập vào");
        return false;
    } 
    endpoint = endpoint.replace(":id", number);
    axios.post(BASE_URL + endpoint, [], options)
        .then(function (response) {
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponseGetbyID").text(textJson);
        });
      
}
function InsertValue(endpoint) {
    axios.post(BASE_URL + endpoint, $("#form-insert").serialize(), options)
        .then(function (response) {
            var data = response.data.is_success;
            if (data)
            {   $("#insert").modal("hide");
                alert("Insert success");
            }
            // $("#getReponseInsert").text(JSON.stringify(data));
            
        });
}

function UpdateValuebyID(endpoint) {
    var number = $("#numberID").val();
    if (number == null || number == "") {
        alert("Vui lòng nhập vào");
        return false;
    } 
    endpoint = endpoint.replace(":id", number);
    axios.post(BASE_URL + endpoint, $("#form-Update").serialize(), options)
        .then(function (response) {
            var data = response.data.is_success;
            if (data)
            {
                $("#getUpdatebyID").modal("hide");
                alert("update success");
            }
            else{
                alert("error: " + JSON.stringify(response.data.errors));
                console.log(response.data);
            }
            // $("#getReponseInsert").text(JSON.stringify(data));
            
        });
}

function getDeletebyID(endpoint) {
    axios.post(BASE_URL + endpoint, {
        "id": -1,
        "deleteForever": "true"
    }, options)
        .then(function (response) {
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponseDeleteAll").text(textJson);
           
        });
}

function getDeleteAll(endpoint) {
    axios.post(BASE_URL + endpoint, {
        "id": -1,
        "deleteForever": "true"
    }, options)
        .then(function (response) {
            var data = response.data;
            var textJson = JSON.stringify(data, undefined, 4);
            $("#getReponseDeleteAll").text(textJson);
           
        });
}
function ItemAPICompoment(name) {
    return `<div class="row row-style">
    <div class="col-4">
      <label>${name}</label>
    </div>
    <div class="col-8">
      <input type="text" name="${name}" class="form-control">
    </div>
  </div>`
}

function InsertField() {
    $("#form-insert-field").html("");
    properties.table_fields.forEach(element => {
        $("#form-insert-field").append(ItemAPICompoment(element.name))
    })
}
function UpdatebyID() {
    $("#form-Update-field").html("");
    properties.table_fields.forEach(element => {
        $("#form-Update-field").append(ItemAPICompoment(element.name))
    })
}

function RefreshgetbyID(){
    document.getElementById("NumberID").value = " ";
    var refresh = "Chưa có dữ liệu, hãy điền ID vào";
    $("#getReponseGetbyID").text(JSON.stringify(refresh));
}