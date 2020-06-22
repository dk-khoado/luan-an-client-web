
var NameOfFiledCompoment = (index) => {
    return `  <div class="row" id="${index}" >
    <div class="col-lg-4 ">
        <input type="text" class="form-control" placeholder="Name of Field" name="name" id="name${index}"
            aria-describedby="basic-addon1" id="namefiled" required oninput="validateMatch(${index})" required autocomplete="off">
    </div>
    <div class="col-lg-2 ">
        <select class="browser-default custom-select" name="dataType" id="datatype-${index}">
        <option value="Int">Int</option>
        <option value="String">String</option>
        <option value="Boolean">Boolean</option>
        </select>
    </div>
    <div class="col-lg-2 ">
        <select class="browser-default custom-select" name="notNull" id="notNull-${index}">
        <option value="true">Null</option>
        <option value="false">Not Null</option>
     
        </select>
    </div>
    <div class="col-custom-23">
        <select class="browser-default custom-select" name="isUnique" id="isUnique-${index}">
        <option value="true">Unique</option>
        <option value="false">No Unique</option>;1
        </select>
    </div>
    <div class="col-lg-1 px-3">
        <button class="btn btn-danger px-2" type="button" onclick="removeField(${index})"> 
            <i class="far fa-trash-alt" style="font-size:24px"></i>
        </button>
    </div>
    <div class="ml-3 text-danger mt-3 d-none" id="error${index}">Tên của Field không được trùng</div>
</div>`
}
 // <button class="btn btn-danger" type="button" onclick="removeField(${index})">Remove</button>
//List của những Field cần gửi lên API
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
    //checkbox checked Author và Private
    var checkPrivate = true;
    var checkProtect = true;
    if ($("#author").prop("checked") == false )
    {
        checkProtect = false;
    }
    if ($("#private").prop("checked") == false )
    {
        checkPrivate = false;
    }
    //Data gửi lên API 
    var data = {
        table_name: $('#table_name').val(),
        table_fields: [],
        isPrivate : checkPrivate,
        isProtect : checkProtect
    }

    // Gửi dữ liệu lên cho tha
    let temp = new Object();
    
    for (let index = 0; index < listField.length; index++) {
        const element = listField[index];
        temp = new Object();
        temp.name = $("#name" + element.id).val();
        temp.dataType = $("#datatype-" + element.id).val();
        temp.notNull = $("#notNull-" + element.id).val();
        temp.isUnique = $("#isUnique-" + element.id).val();
        data.table_fields.push(temp);
    }
    console.log(data);
    options = {
        headers:
            { Authorization: "Bearer " + token }
    };
    axios.post(BASE_URL + POST_CREATE_API, data, options)
        .then(function (response) {
            console.log(response);
            var data = response.data.is_success;
            if (data)
            {
                window.location.replace("/manager/api");
            }
            else
            {
                alert(response.data.message);
            }
        })
        .catch(function (error) {
        });
}   
