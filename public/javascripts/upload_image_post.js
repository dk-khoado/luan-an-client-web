async function readURL(input) {
    $("#progress-parrent-post").removeClass("d-none");
    $("#progress-post").width("0%");


    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log("aa");
        reader.onload = function (e) {
            $('#image-post').attr('src', e.target.result);
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

            axios.post(BASE_URL + POST_UPLOAD_IMAGE_POST + "/" + POST_ID, formData, options)
                .then(function (response) {
                    console.log("Success");
                    $("#progress-parrent-post").addClass("d-none");
                })
                .catch(function (error) {
                    console.log(error);
                    $("#progress-parrent-post").addClass("d-none");
                });
        };

    }

}

$("#file-input-post").change(function () {
    readURL(this);
});