$(document).ready(function () {

    // Redirect to view-post upon clicking a post in the home page
    //$(".post-entry").on('click') 

    // Increase or decrease like count (toggle) upon clicking like
    $(".normal-like-button").on('click', function(){
        let obj = $(this);
        let _id = obj.siblings('[name="_id"]').val(); //returns double the id string separated by ','
        

        // If the post/comment has not yet been liked
        if (obj.siblings('[name="_id"]').attr('class') == 'post-like') {
            
            console.log('jqueryid: ' + _id);
            $.get('/like-post', { _id: _id }, function(newLikeCount){
                obj.siblings('.normal-like-count').text(newLikeCount.likes);
            })
        }
        else if (obj.siblings('[name="_id"]').attr('class') == 'comment-like') {
            console.log('jqueryid: ' + _id);
            $.get('/like-comment', { _id: _id }, function(newLikeCount) {
                obj.siblings('.normal-like-count').text(newLikeCount.likes);
            });
        }
    });

    // Preview of uploaded images
    function readURLprofpic(input){
        if (input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.profile-pic-editprofile').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function readURLfavechar(input){
        if (input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.favechar-img-editprofile').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    // Will show preview of uploaded images on upload
    $(".changeprofilepic-editprofile").change(function(){
        readURLprofpic(this);
    });

    $(".changefavecharpic-editprofile").change(function(){
        readURLfavechar(this);
    });

    // Editing post
    $(".editpostbtn-viewpost").on('click', function() {
        if ($(".editpost-container").html() == '')
        {
            $(".editpost-container").html(`<form action="/save-editpost" method="post" enctype="multipart/form-data">
            <input type="hidden" class="editpost-id" name="_id" value="` + $(".post-like").val() + `"/>
            <textarea class="content-box" wrap="soft" name="textContent">` + $('.main-content .text-post').text().trim() + `</textarea>
            <input type="file" value="Attach media" class="post-upload-image" accept="image/*" name="imageContent"/>
            <input type="submit" value="Save Changes" class="submit-post" value="SUBMIT" />
            </form>`);
        }
        else
        {
            $(".editpost-container").html('');
        }
        
        
    }); 

    // Deleting post
    $(".deletepostbtn-viewpost").on('click', function() {
        var postId = $('.post-like').val();

        if (confirm("Are you sure you want to delete your post?"))
        {
            //console.log("postId: " + postId);
            $.get('/delete-post', { _id: postId }, (result) => {
                //console.log("delete post result: " + result);
                
            });
            // it wont redirect back to home ??
            $.get('/home');
        }
        else
        {
            console.log("post was not deleted");
        }
    });


    // Create a post

    // Create a comment on a post

    // Reply to a comment on a post

    // Delete a post

    // Delete a comment

    // Delete account

    // Edit profile
})