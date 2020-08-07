var db = firebase.firestore();
var urlParams = new URLSearchParams(window.location.search);
var article = urlParams.get('article');

function showArticle() {
    db.collection("articles").doc(article).get().then(doc => {
        if (doc.exists) {
            var data = doc.data();
            document.getElementsByClassName("article-details")[0].innerHTML = `
            <img src="${data.url}" class="article-image"/>
        <div class="article-content">
            <h2 class="article-title">
                ${data.title}
            </h2>
            <p class="article-text">
                ${data.body}
            </p>
            <div class="article-btn pt-2">
                <a href="edit_blog.html?article=${article}" class="btn btn-primary btn-sm" >Edit</a>
                <a href="#" class="btn btn-danger btn-sm" id="delete" onclick="deleteArticle(event)">Delete</a>
            </div>
        </div>
            `
        } else {
            document.getElementsByClassName("article-details")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Article not found</h3></div>
            `
        }
    })
        .catch(err => {
            document.getElementsByClassName("article-details")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while loading article</h3></div>
            `
        })
}

function deleteArticle(event) {
    event.preventDefault();
    if (!confirm("Delete this article?")) return;
    var deleteBtn = document.getElementById("delete");
    deleteBtn.innerText = "Deleting....";
    db.collection("articles").doc(article).delete().then(function () {
        location = "index.html";
    }).catch(function (error) {
        deleteBtn.innerText = "Delete";
        alert("Error while deleting!")
    });
}