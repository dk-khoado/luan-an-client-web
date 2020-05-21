function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
            base64 = e.target.result;
            var data = {
                pathGetImage: base64.split(',')[1]
            }
            options = {
                headers:
                    { Authorization: "Bearer " + token }
            };
            axios.post(BASE_URL + POST_UPLOAD_IMAGE, data, options)
                .then(function (response) {
                    console.log("Success");
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        reader.readAsDataURL(input.files[0]);

    }

}

$("#file-input").change(function () {
    readURL(this);
});