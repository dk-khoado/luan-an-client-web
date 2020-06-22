function PostIndexComponents(post_image, user_image, title_post, fullName, summary_post, id) {
    return `<div class="border-box mb-3">
    <div class="row d-flex justify-content-between">
        <div class="col-lg-auto">
            <img src='${post_image}' class="border-image">
        </div>
        <div class="col-lg-7">
            <div class="row m-0">
                <div class="col-lg-auto p-lg-0">
                    <img src='${user_image}' class="img-author" onerror="this.onerror=null;this.src='../assets/img/default_image.png';">
                </div>
                <div class="col-lg-10">
                    <h6 class="text-title">${title_post}</h6>
                    <p class="text-content">${fullName} </p>
                </div>
            </div>

            <div class="row mx-0 row-description">
                <div class="col-12 border-description p-0" style="word-break: break-all;">
                ${summary_post}
                </div>
            </div>
            
            <div class="row justify-content-end mx-0 mt-3">
            <button class="btn btn-primary" onClick="DetailPost('${id}')">
            Đọc thêm</button>
        </div>

        </div>
    </div>
</div>`
}

options = {
    headers: { Authorization: "Bearer " + token }
}
var data = [];
axios.post(BASE_URL + ALLPOST_TUTORIAL, data, options)
    .then(function(response) {
        data = response.data.data_response;
        data.forEach(element => {
            $('#postDetails').append(PostIndexComponents(element.image_post, element.user_id.image, element.title_post, element.user_id.fullName, element.summary_post, element._id));
        });
    })
    .catch(function(error) {

        console.log(error);

    });


function DetailPost(id) {
    axios.post(BASE_URL + DETAIL_POST, {
            "postID": id
        }, options)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {

            console.log(error);

        });

}