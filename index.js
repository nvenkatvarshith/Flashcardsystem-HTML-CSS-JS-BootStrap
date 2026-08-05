let flashcard = [];

(function() {
    flashcard = JSON.parse(localStorage.getItem('flashcard') || '[]');
    let str="";
    flashcard.forEach((flashcard,index) => {
        str += `
            <div class="card py-4 text-center" id="${index}" style="width: 13.2rem;" onmouseenter="showCategoryOptions(${index})" onmouseleave="hideCategoryOptions(${index})">
                <div class="card-body">
                    <h4>${flashcard.category}</h4>
                    <div class="d-none" id="showbutton-${index}">
                        <button type="button" class="btn btn-outline-secondary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">view</button>
                        
                    </div>
                </div>
            </div>
        `
    });
    document.getElementById("categories").innerHTML += str;
})();

function addNewCategory(){
    const category = document.getElementById("newcategory");
    if(category.value == ''){
        document.getElementById("error-msg").innerHTML = "Please enter the value";
    }else{
        flashcard.push({category: category.value.toUpperCase()});
        localStorage.setItem("flashcard", JSON.stringify(flashcard));
        window.location.href = "/";
    }
}

function showCategoryOptions(cardid){
    let showButtons = document.getElementById("showbutton-"+cardid).classList;
    if(showButtons.value.includes("d-none")){
        showButtons.remove("d-none");
    }
}

function hideCategoryOptions(cardid){
    document.getElementById("showbutton-"+cardid).classList.add("d-none");
}
