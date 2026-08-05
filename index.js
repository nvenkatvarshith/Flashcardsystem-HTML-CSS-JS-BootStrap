let flashcard = [];

(function() {
    flashcard = JSON.parse(localStorage.getItem('flashcard') || '[]');
    let str="";
    flashcard.forEach((flashcard,index) => {
        str += `
            <div class="col mt-2">
                <div class="card py-4 text-center" id="${index}">
                    <div class="card-body">
                        <h4>${flashcard.category} ${showCardStatus(flashcard.cardsdue)}</h4>
                        <div class="d-flex flex-column fw-semibold">
                            <div class="p-1">Total Cards:</div>
                            <div class="p-1">Learning:</div>
                            <div class="p-1">Graduated: </div>
                        </div>

                        <div class="d-none" id="showbutton-${index}">
                            <button type="button" class="btn btn-outline-secondary px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">view</button>
                        </div>
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

function showCardStatus(cardsdue){
   if(cardsdue>0){
        return `<span class="badge text-bg-danger">${cardsdue}</span>`;
   }else{
        return `<span class="badge text-bg-success">No due</span>`;
   }
}