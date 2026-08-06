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
                                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                    Add Card
                                </button>

                                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Card</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <input type="text" class="w-100 py-2 rounded-3" name="front" id="front${flashcard.categoryname}" placeholder="Enter front of card">
                                                    <input type="text" class="w-100 py-2 mt-2 rounded-3" name="back" id="back${flashcard.categoryname}" placeholder="Enter back of card">
                                                    <input type="number" class="w-100 py-2 mt-2 rounded-3" name="interval" id="interval${flashcard.categoryname}" placeholder="Enter interval">
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-success" onclick = "addCardToCategory('${flashcard.categoryname}')">Add Card</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    studydeck.forEach((studydeckcategory,index) => {
        if(studydeckcategory.categoryname === selectedCategory){
            document.getElementById("show-categories").classList.add("d-none");
            populateFlashCards(studydeckcategory);
            document.getElementById("flashcards").classList.remove("d-none");
        }
    })
}

function populateFlashCards(studydeckcategory){
    let str = "";
    let todaysflashcards = studydeckcategory.flashcards.filter((flashcard) => {
        return isToday(flashcard.nextReviewDate);
    });
    todaysflashcards.forEach((flashcard) => {
        str += `
            <div class="card col" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${studydeckcategory.categoryname}</h5>
                    ${` <div id="front${flashcard.id}">
                            <h6 class="card-subtitle mb-2 text-body-secondary">${flashcard.front}</h6>
                            <button type="button" class="btn btn-outline-secondary" onclick="revealAnswer('${flashcard.id}')">Reveal Answer</button>
                        </div>
                        <div id="back${flashcard.id}" class="d-none mt-3">
                            <h6 class="card-subtitle mb-2 text-body-secondary">Answer: ${flashcard.back}</h6>
                            <div class = "row row-cols-auto">
                                <button type="button" class="btn btn-outline-warning" onclick="reviewAgain('${flashcard.id}')">Again</button>
                                <button type="button" class="btn btn-outline-danger" onclick="updateReviewDate('${studydeckcategory.categoryname}','${flashcard.id}','Hard')">Hard</button>
                                <button type="button" class="btn btn-outline-info" onclick="updateReviewDate('${studydeckcategory.categoryname}','${flashcard.id}','Good')">Good</button>
                                <button type="button" class="btn btn-outline-secondary" onclick="updateReviewDate('${studydeckcategory.categoryname}','${flashcard.id}','Easy')">Easy</button>
                            </div>
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

function reviewAgain(flashcardid){
    document.getElementById('back'+flashcardid).classList.add('d-none');
    document.getElementById('front'+flashcardid).classList.remove('d-none');
}

function addCardToCategory(categoryname){
    let front = document.getElementById("front"+categoryname).value;
    let back = document.getElementById("back"+categoryname).value;
    let interval = document.getElementById("interval"+categoryname).value;
    let card = {
        front,
        back,
        interval,
        nextReviewDate: new Date().toISOString
    };
    studydeck.forEach((deck) => {
        if(deck.categoryname == categoryname) {
            card['id'] = 101 + deck.flashcards.length;
            deck.flashcards.push(card);
        }
    });
    localStorage.setItem("studydeck", JSON.stringify(studydeck));
    window.location.href = "/";
}

function updateReviewDate(categoryname, flashcardid, rating){
    let days = 0;
    switch(rating){
        case 'Hard' : days = 2;
            break;
        case 'Good' : days = 4;
            break;
        case 'Easy' : days = 7;
            break;
    }
    studydeck.forEach((deck) => {
        if(deck.categoryname == categoryname) {
            deck.flashcards.forEach((flashcard) => {
                if(flashcard.id == flashcardid){
                    flashcard.interval = days;
                    flashcard.nextReviewDate = addDaysToISO(flashcard.nextReviewDate,days);
                }
            });
        }
    });
    localStorage.setItem("studydeck", JSON.stringify(studydeck));
}

const addDaysToISO = (isoString, days) => {
  const d = new Date(isoString);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
