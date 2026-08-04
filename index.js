let flashcard = [];

(function() {
    flashcard = JSON.parse(localStorage.getItem('flashcard') || '[]');
    let str="";
    flashcard.forEach(flashcard => {
        str += `
            <div class="card py-4 text-center" style="width: 13.2rem;">
                <div class="card-body">
                    <h4>${flashcard.category}</h4>
                </div>
            </div>
        `
    });
    document.getElementById("categories").innerHTML += str;
})();

function addNewCategory(){
    const category = document.getElementById("newcategory");
    flashcard.push({category: category.value});
    localStorage.setItem("flashcard", JSON.stringify(flashcard));
    window.location.href = "/";
}
