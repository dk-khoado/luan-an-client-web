
var NameOfFiledCompoment = (index) => {
    return `  <div class="row" id="${index}" >
    <div class="col-lg-6 text-left">
        <input type="text" class="form-control" placeholder="Name of Field" name="name" id="name${index}"
            aria-describedby="basic-addon1" id="namefiled" required oninput="validateMatch(${index})" required autocomplete="off">
    </div>
    <div class="col-lg-4 text-right">
        <select class="browser-default custom-select" name="dataType">
        <option value="Int">Int</option>
        <option value="String">String</option>
        <option value="Boolean">Boolean</option>
        </select>
    </div>
    <div class="col-lg-2 text-right">
        <button class="btn btn-danger" type="button" onclick="removeField(${index})">Remove</button>
    </div>
    <div class="ml-3 text-danger mt-3 d-none" id="error${index}">Tên của Field không được trùng</div>
</div>`
}

var listField = [];
var isError = false;
$(document).ready(function () {
    var id = 0;
    $("#btnAddField").click(function () {
        id++;
        $("#numberRow").append(NameOfFiledCompoment(id));
        listField.push({ id: id });
    });
});

function removeField(index) {
    $("#" + index).remove();
    var id = listField.findIndex(v => v.id == index);
    listField.splice(id, 1, undefined);
}

function validateMatch(id) {

    var rowField = $('#name' + id).val();
    if (rowField == "") {
        return;
    }
    for (let index = 0; index < listField.length; index++) {
        const element = listField[index];
        if (element.id != id) {
            var other = $('#name' + element.id).val();
            if (rowField == other) {
                isError = true;
                $('#error' + id).removeClass('d-none');
                $('#rowField').addClass('mt-3');
            } else {
                isError = false;
                $('#error' + id).addClass('d-none');
                $('#rowField').removeClass('mt-3');
            }

        }

    }
}

function createAPI() {
    // console.log($("#create")).serilizeArray();
    var validateAPIName = /^[A-Za-z0-9_]+$/.test($('#table_name').val());
    if (validateAPIName == false) {
        alert("Tên API không được để trống");
        return;
    }
    if (listField.length < 1) {
        alert("Vui lòng tạo Field");
        return;
    }
    if (isError) {
        alert("Các Field không được trùng");
    }
    var data = {
        table_name: $('#table_name').val(),
        table_fields: []
    }
    var table_fields = $("#create").serializeArray();

    var temp = {};

    table_fields.forEach(element => {
        switch (element.name) {
            case "name":
                temp.name = element.value;
                break;
            case "dataType":
                temp.dataType = element.value;
                data.table_fields.push(temp);
                break;
            default:
                break;
        }
    });
    console.log(data);
    options = {
        headers:
            { Authorization: "Bearer " + token }
    };
    axios.post(BASE_URL + POST_UPLOAD_IMAGE, data, options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
