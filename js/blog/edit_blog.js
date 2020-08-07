var db = firebase.firestore();
var urlParams = new URLSearchParams(window.location.search);
var article_id = urlParams.get('article');

db.collection("articles").doc(article_id).get().then(doc => {
    if (doc.exists) {
        var data = doc.data();
        document.getElementById("title").value = data.title;
        document.getElementById("url").value = data.url;
        document.getElementById("body").value = data.body;
    }
    else{
        var alertDanger = document.getElementsByClassName("alert-danger")[0];
        alertDanger.innerHTML = "article not found, fill the forms to create a new one.";
        alertDanger.style.display = "block";
    }
});
document.getElementById("blog_form").addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var url = document.getElementById("url").value;
    var body = document.getElementById("body").value;
    var submitBtn = document.getElementById("submit");
    var oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Editing article....";
    db.collection("articles").doc(article_id).set({
        title, url, body
    })
        .then(function (docRef) {
            submitBtn.innerHTML = oldText;
            var alertSuccess = document.getElementsByClassName("alert-success")[0];
            alertSuccess.innerHTML = "Article updated successfully";
            alertSuccess.style.display = "block";
        })
        .catch(function (error) {
            var alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while updating the article.";
            alertDanger.style.display = "block";
        });
});


