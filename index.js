let studydeck = [];

(function() {
    const apiKey = ''; 
    const flashcardmode = false;
    studydeck = JSON.parse(localStorage.getItem('studydeck') || '[]');
    let str="";
    studydeck.forEach((flashcard,index) => {
        str += `
            <div class="col mt-2">
                <div class="card py-4 text-center" id="${index}">
                    <div class="card-body">
                        <h4>${flashcard.categoryname} ${showCardStatus(todaysCardCount(flashcard))}</h4>
                        <div class="d-flex flex-column fw-semibold">
                            <div class="p-1">Total Cards: ${flashcard.flashcards.length}</div>
                            <div class="p-1">Learning: ${todaysCardCount(flashcard)}</div>
                        </div>
                        <div class="d-grid gap-2">
                            <button id="flashcard-${index}" type="button" class="btn btn-success w-100 mt-2 px-4 py-2" onclick = "showDeckCards('${flashcard.categoryname}')">Study Now</button>
                            <div class="btn-group gap-2" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal${flashcard.id}">
                                    Add Card
                                </button>

                                <div class="modal fade" id="exampleModal${flashcard.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#aiModal${flashcard.id}">
                                    AI Generate✨
                                </button>

                                <div class="modal fade" id="aiModal${flashcard.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Cards Using AI</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <input type="text" class="w-100 py-2 rounded-3" name="front" id="source${flashcard.categoryname}" placeholder="Enter topic of card to be added">
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-success" onclick = "getAIResponse('${flashcard.categoryname}')">Generate Cards</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    document.getElementById("categories").innerHTML += str;
    updateTotalDueToday();
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
        return `<span class="badge text-bg-danger">${cardsdue} due</span>`;
   }else{
        return `<span class="badge text-bg-success">No due</span>`;
   }
}

function showDeckCards(selectedCategory){
    studydeck.forEach((studydeckcategory,index) => {
        if(studydeckcategory.categoryname === selectedCategory){
            document.getElementById("show-categories").classList.add("d-none");
            populateFlashCards(studydeckcategory);
            document.getElementById("flashcards-deck").classList.remove("d-none");
        }
    })
    flashcardmode = true;
}

function populateFlashCards(studydeckcategory){
    let str = `
        <h5 class="text-center">${studydeckcategory.categoryname}</h5>
        <div class="row row-cols-3 text-center gap-3 justify-content-center mt-3">
    `;
    let todaysflashcards = studydeckcategory.flashcards.filter((flashcard) => {
        return isToday(flashcard.nextReviewDate);
    });
    todaysflashcards.forEach((flashcard) => {
        str += `
            <div class="card col" style="width: 18rem;">
                <div class="card-body">
                    ${` <div id="front${flashcard.id}">
                            <h6 class="card-subtitle mb-2 text-body-secondary">${flashcard.front}</h6>
                            <button type="button" class="btn btn-outline-secondary" onclick="revealAnswer('${flashcard.id}')">Reveal Answer</button>
                        </div>
                        <div id="back${flashcard.id}" class="d-none mt-3">
                            <h6 class="card-subtitle mb-2 text-body-secondary">${flashcard.back}</h6>
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
    str += `</div>
        <button class="btn btn-secondary mt-4" onclick="goToHomePage()"><i class="fa-solid fa-left-long"></i> Back to dashboard</button>
    `;
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
        nextReviewDate: new Date().toISOString()
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
    window.location.href = "/";
}


const addDaysToISO = (isoString, days) => {
  const d = new Date(isoString);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

function isToday(dateString){
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function todaysCardCount(flashcard){
    let todaysflashcards = flashcard.flashcards.filter((flashcard) => {
        return isToday(flashcard.nextReviewDate);
    });
    return todaysflashcards.length;
}

function goToHomePage(){
    flashcardmode = false;
    window.location.href = "/";
}

function updateTotalDueToday(){
    let count = 0; 
    studydeck.forEach((studydeckcategory) => {
        count += studydeckcategory.flashcards.filter((flashcard) => {
            return isToday(flashcard.nextReviewDate);
        }).length;
    })
    document.getElementById("totaldue-cards").innerHTML = count;
}

function saveOpenAIKey(){
    apiKey = document.getElementById("openaikey").value;
}


async function getAIResponse(categoryname) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    let sourceText = document.getElementById("source"+categoryname).value;
    const todayISO = new Date().toISOString();
    
    const systemPrompt = `You are an expert educational assistant designed to generate spaced repetition flashcards. 
            Analyze the user's provided text and extract the most important facts, concepts, and definitions.

            CRITICAL RULES:
            1. QUANTITY: You must generate EXACTLY 10 flashcards.
            2. ZERO HALLUCINATION: Only use information explicitly stated in the source text.
            3. ATOMICITY: Each flashcard should test only one specific concept. Keep questions concise and answers brief.
            4. DEFAULTS: You MUST set interval to 0 and nextReviewDate to "${todayISO}" for every card. Generate a unique random integer for the id.`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: sourceText }
                ],
                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "flashcard_array",
                        strict: true,
                        schema: {
                            type: "object",
                            properties: {
                                flashcards: {
                                    type: "array",
                                    description: "An array of exactly 10 flashcards.",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { 
                                                type: "integer", 
                                                description: "A unique integer identifier for the card" 
                                            },
                                            front: { 
                                                type: "string", 
                                                description: "The prompt or question" 
                                            },
                                            back: { 
                                                type: "string", 
                                                description: "The exact answer" 
                                            },
                                            interval: { 
                                                type: "integer", 
                                                description: "Must always be 0" 
                                            },
                                            nextReviewDate: { 
                                                type: "string", 
                                                description: "The provided ISO date string" 
                                            }
                                        },
                                        required: ["id", "front", "back", "interval", "nextReviewDate"],
                                        additionalProperties: false
                                    }
                                }
                            },
                            required: ["flashcards"],
                            additionalProperties: false
                        }
                    }
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const parsedContent = JSON.parse(data.choices[0].message.content);
        let generatedFlashCards = parsedContent.flashcards;
        studydeck.forEach((category) => {
            if(category.categoryname == categoryname){
                category.flashcards.push(...generatedFlashCards);
            }
        });
        localStorage.setItem("studydeck", JSON.stringify(studydeck));
        window.location.href = "/";


    } catch (error) {
        console.error("Error generating AI flashcards:", error);
        throw error;
    }
}