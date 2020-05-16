function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string

        reader.onloadend = function (e) {
            base64 = e.target.result;
            // console.log(base64);
            console.log(base64.split(',')[1]);
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
        };

    }

}

$("#file-input").change(function () {
    readURL(this);
});