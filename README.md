# BrainSpaced 🧠⚡

**AI-Powered Spaced Repetition Flashcard System**

BrainSpaced is a dynamic, single-page web application (SPA) built with HTML, CSS, Vanilla JavaScript, and Bootstrap 5. It leverages a Spaced Repetition System (SRS) to help users retain information efficiently and integrates OpenAI's API to magically generate flashcards on any topic in seconds.

## ✨ Features

*   **Spaced Repetition Algorithm:** Rate your memory recall (Again, Hard, Good, Easy) to automatically schedule the next review date.
*   **AI-Powered Card Generation:** Don't want to type? Simply enter a topic (e.g., "JS array methods"), and the app fetches 10 perfectly formatted flashcards using the OpenAI API.
*   **Comprehensive Dashboard:** Track your daily workload, including total cards due today, newly added cards, and overall retention rate.
*   **Deck Categories:** Organize your study materials into structured categories (e.g., JavaScript, JAVA).
*   **Local Storage Persistence:** All your decks, cards, and study progress are seamlessly saved in your browser's local storage. No backend database required!
*   **Responsive UI:** A clean, modern, and intuitive interface built with Bootstrap 5.

## 🚀 Getting Started

### Prerequisites
*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   An [OpenAI API Key](https://platform.openai.com/api-keys) (to use the AI generation feature).

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/brainspaced.git
   ```
2. Open the project folder.
3. Launch `index.html` in your browser. *(Tip: Use an extension like VS Code's "Live Server" to avoid CORS issues when fetching).*

### Configuration
1. Click the **Settings (Gear Icon)** in the top right corner of the navbar.
2. Paste your OpenAI API Key (`sk-...`) into the input field and click **Save changes**. 
3. *Note: Your API key is stored locally in your browser and is only sent directly to OpenAI's servers.*

## 📸 Screenshots
<img width="1906" height="974" alt="Screenshot 2026-08-06 172522" src="https://github.com/user-attachments/assets/6ce747c7-e16d-4fc5-94a6-26aed2d99f6c" />
<img width="1915" height="904" alt="Screenshot 2026-08-06 172558" src="https://github.com/user-attachments/assets/34aead56-9792-44a0-853a-861089a1205e" />
<img width="1917" height="980" alt="Screenshot 2026-08-06 172611" src="https://github.com/user-attachments/assets/71ff3815-0d26-49e8-9abd-035eff676e10" />
<img width="1838" height="540" alt="Screenshot 2026-08-06 172726" src="https://github.com/user-attachments/assets/5b5f32fd-fc22-4616-801e-c27490285f77" />
<img width="1919" height="1002" alt="Screenshot 2026-08-06 172739" src="https://github.com/user-attachments/assets/483c09b9-b5f0-4624-a8d9-a0a74f4ef61a" />
<img width="1919" height="905" alt="Screenshot 2026-08-06 172747" src="https://github.com/user-attachments/assets/588ffad2-3256-4939-a17c-7e643b12b3db" />
<img width="1919" height="917" alt="Screenshot 2026-08-06 172800" src="https://github.com/user-attachments/assets/9a9cff97-41c5-49d4-8aa5-fc303614145d" />

* **Dashboard View:** Shows global stats and your category library.
* **API Key Setup:** Secure modal to input your OpenAI API Key.
* **AI Generation:** Generating 10 new cards instantly by typing a topic.
* **Active Study View:** Flipping cards and rating difficulty (Again, Hard, Good, Easy) to set the next review date.

## 🛠️ Tech Stack
*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
*   **UI Framework:** Bootstrap 5
*   **API:** OpenAI Chat Completions API (`gpt-4o-mini` with Structured Outputs)
