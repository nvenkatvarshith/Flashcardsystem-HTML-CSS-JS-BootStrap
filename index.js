let studydeck = [];

(function() {
    studydeck = JSON.parse(localStorage.getItem('studydeck') || '[]');
    let str="";
    studydeck.forEach((flashcard,index) => {
        str += `
            <div class="col mt-2">
                <div class="card py-4 text-center" id="${index}">
                    <div class="card-body">
                        <h4>${flashcard.categoryname} ${showCardStatus(flashcard.cardsdue)}</h4>
                        <div class="d-flex flex-column fw-semibold">
                            <div class="p-1">Total Cards:</div>
                            <div class="p-1">Learning:</div>
                            <div class="p-1">Graduated: </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button id="flashcard-${index}" type="button" class="btn btn-success w-100 mt-2 px-4 py-2" onclick = "showDeckCards('${flashcard.categoryname}')">Study Now</button>
                            <div class="btn-group gap-2" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-outline-secondary">Add Card</button>
                                <button type="button" class="btn btn-light">AI Generate✨</button>
                            </div>
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
        studydeck.push({category: category.value.toUpperCase()});
        localStorage.setItem("studydeck", JSON.stringify(studydeck));
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

function showDeckCards(selectedCategory){
    console.log(selectedCategory);
    studydeck.forEach((studydeckcategory,index) => {
        if(studydeckcategory.categoryname === selectedCategory){
            document.getElementById("show-categories").classList.add("d-none");
            populateFlashCards(selectedCategory,index);
            document.getElementById("flashcards").classList.remove("d-none");
        }
    })
}

function populateFlashCards(selectedCategory,index){
    let str = "";
    console.log(studydeck[index].flashcards);
    studydeck[index].flashcards.forEach((flashcard) => {
        str += `
            <div class="card col" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${selectedCategory}</h5>
                    ${` <div id="front${flashcard.id}">
                            <h6 class="card-subtitle mb-2 text-body-secondary">${flashcard.front}</h6>
                            <button type="button" class="btn btn-outline-secondary" onclick="revealAnswer('${flashcard.id}')">Reveal Answer</button>
                        </div>
                        <div id="back${flashcard.id}" class="d-none mt-3">
                            <h6 class="card-subtitle mb-2 text-body-secondary">Answer: ${flashcard.back}</h6>
                        </div>
                    `} 
                </div>
            </div>
        `;
    });
    document.getElementById("flashcards-deck").innerHTML = str;
}

function revealAnswer(flashcardid){
    document.getElementById('back'+flashcardid).classList.remove('d-none');
    document.getElementById('front'+flashcardid).classList.add('d-none');
}