$(document).ready(function () {
    $('#description').summernote({
        height: 300,
        minHeight: 300,
        maxHeight: 500,
        lang: 'vi-VN',
        callbacks: {
            onImageUpload: function (image) {

                if (image && image[0]) {
                    var formData = new FormData();
                    formData.append("avatar", image[0]);
                    options = {
                        headers:
                            { Authorization: "Bearer " + token, 'Content-Type': 'multipart/form-data' },
                    };
                    axios.post(BASE_URL + POST_UPLOAD_IMAGE_SUMMERNOTE, formData, options)
                        .then(function (response) {
                            var image = $('<img>').attr('src', response.data.data_response.secure_url);
                            $('#description').summernote("insertNode", image[0]);
                        })
                };
            }
        }
    });


});
