async function readURL(input) {
    $("#progress-parrent").removeClass("d-none");
    $("#progress").width("0%");


    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log("aa");
        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string

        reader.onloadend = function (e) {
            // base64 = e.target.result;
            // console.log(base64);
            // console.log(base64.split(',')[1]);
            var formData = new FormData();
            formData.append("avatar", input.files[0]);
            options = {
                headers:
                    { Authorization: "Bearer " + token, 'Content-Type': 'multipart/form-data' },
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    $("#progress").width(percentCompleted + "%");
                }
            };

            axios.post(BASE_URL + POST_UPLOAD_IMAGE, formData, options)
                .then(function (response) {
                    console.log("Success");
                    $("#progress-parrent").addClass("d-none");
                })
                .catch(function (error) {
                    console.log(error);
                    $("#progress-parrent").addClass("d-none");
                });
        };

    }

}

$("#file-input").change(function () {
    readURL(this);
});