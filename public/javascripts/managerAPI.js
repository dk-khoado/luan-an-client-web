function ItemAPICompoment(name, endpoint) {
    return ` <tr>
    <td onclick="setValue('${name}', '${endpoint}')">${name}</td>
    <td>  #  </td>
    <td>
        <button class="btn btn-success btn-sm">View</button>
        <button class="btn btn-primary btn-sm">Edit</button>
        <button class="btn btn-secondary btn-sm" data-toggle="modal"
            data-target="#delete">Delete</button>
    </td>
</tr>`
}
options = {
    headers:
        { Authorization: "Bearer " + token }
};
var data = [];
axios.post(BASE_URL + POST_MANANER_API, data, options)
    .then(function (response) {
        //   console.log(response.data.data_response);
        var data = response.data.data_response;
        data.forEach(element => {
            $('#apiList').append(ItemAPICompoment(element.table_name, element.endpoint_action));
        });
    })
    .catch(function (error) {
        console.log(error);
    });

function setValue(name, endpoint) {
    $("#name").text(name);
    // $("#getAll").unbind('click');
    $("#getAll").click(getValueAll(endpoint));

}

function getValueAll(endpoint) {
    axios.post(BASE_URL + endpoint, [], options)
        .then(function (response) {
            //   console.log(response.data.data_response);
            console.log(response);
           
        });
}

