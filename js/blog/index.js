var db = firebase.firestore();

function showArticles() {
    db.collection("articles").get().then((querySnapshot) => {
        document.getElementsByClassName("alert-loader")[0].style.display="none";
        querySnapshot.forEach((doc) => {
           var data=doc.data();
           var id=doc.id;
           console.log("Id",id);
            document.getElementsByClassName("cards")[0].innerHTML += `
             <div class="card">
            <a class="card-img" href="article_details.html?article=${id}"><img src="${data.url}" alt="Image"></a>
            <div class="card-details">
                <a href="article_details.html?article=${id}" class="card-title">
                   ${data.title}
                </a>
            </div>
            <div class="card-icons">
                <div class="icon">
                    <i class="ti-heart"></i>
                    <span class="icon-number">0</span>
                </div>
                <div class="icon">
                    <i class="ti-comment"></i>
                    <span class="icon-number">0</span>
                </div>
                <div class="icon">
                    <i class="ti-eye"></i>
                    <span class="icon-number">0</span>
                </div>
            </div>
        </div>
            `
        });
    }).catch(function (err) {
        document.getElementsByClassName("cards")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
    });
}

