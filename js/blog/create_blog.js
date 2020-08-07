document.getElementById("blog_form").addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var url = document.getElementById("url").value;
    var body = document.getElementById("body").value;
    var submitBtn = document.getElementById("submit");
    var oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Creating new article....";
    var db = firebase.firestore();
    db.collection("articles").add({
        title, url, body
    })
        .then(function (docRef) {
            submitBtn.innerHTML = oldText;
            document.getElementById("blog_form").reset();
            var alertSuccess=document.getElementsByClassName("alert-success")[0];
            alertSuccess.innerHTML="Article created successfully";
            alertSuccess.style.display="block";
        })
        .catch(function (error) {
            var alertDanger=document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML="Error while creating the article.";
            alertDanger.style.display="block";
        });
});


