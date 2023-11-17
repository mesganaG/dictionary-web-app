
/**
 * The event handler function to update the font of the page.
 * This function is called when the user selects a font from the dropdown menu.
 * The function updates the font of the page to the selected font.
 * The function also updates the font of the dropdown button to the selected font.
 * 
 */
function fontUpdate() {
  const fontStyle = document.querySelectorAll(".dropdown-item");
  const dropdownBtn = document.querySelector("#dropdown-btn");
  window.onload = dropdownBtn.innerText = "Sans Serif";
  for (let font of fontStyle) {
    font.addEventListener("click", function () {
      dropdownBtn.innerText = font.textContent;
      const currFont = font.textContent;
      if (currFont === "Serif") {
        document.body.style.fontFamily = "serif";
        dropdownBtn.style.fontFamily = "serif";
      } else if (currFont === "Mono") {
        document.body.style.fontFamily = "monospace";
        dropdownBtn.style.fontFamily = "monospace";
      } else {
        document.body.style.fontFamily = "sans-serif";
        dropdownBtn.style.fontFamily = "sans-serif";
      }
    });
  }
}

/**
 * The event handler function to update the border of the search box.
 * This function is called when the user clicks on the search box.
 * The function updates the border of the search box to purple.
 * The function also updates the border of the search box to red if the user clicks on the search button without entering a word.
 */
function SearchBoxEffect() {
  const inputText = document.querySelector(".search-bar-input");
  const inputContainer = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".search-btn");
  const displayError = document.querySelector("p");
  inputText.addEventListener("click", function () {
    inputContainer.style.border = "1px solid #A445ED";
    displayError.style.display = "none";
  });
  searchBtn.addEventListener("click", function () {
      console.log(inputText.value);
      if (inputText.value === "") {
        inputContainer.style.border = "1px solid #FF5252";
        displayError.style.display = "block";
      } else {
        inputContainer.style.border = "0px";
        displayError.style.display = "none";
      }
        
  });
  
}

/**
 * The event handler function to update the play button image.
 * This function is called when the user hovers over the play button.
 * The function updates the play button image to the active play button image.
 */
function playBtnHoverEffect() {
  const playBtnImg = document.querySelector(".btn-img");

  playBtnImg.addEventListener("mouseover", () => {
    playBtnImg.src = "./assets/images/icon-play-active.svg";
  });

  playBtnImg.addEventListener("mouseout", () => {
    playBtnImg.src = "./assets/images/icon-play.svg";
  });
}


/**
 * The event handler function to update the page to dark mode.
 * This function is called when the user clicks on the dark mode toggle button.
 * The function also updates the dark mode toggle button to the active dark mode toggle button.
 * The function also updates based on the user's system preference.
 */
function DarkMode() {
  const darkModeBtn = document.querySelector("#flexSwitchCheckDefault");
  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (darkModeBtn.checked === true) {
      document.querySelector(".moon-icon").src =
        "./assets/images/darkmode_half-moon.svg";
    } else {
      document.querySelector(".moon-icon").src =
        "./assets/images/icon-moon.svg";
    }
  });

  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  if(darkTheme.matches){
    document.body.classList.toggle("dark-mode");
    document.querySelector(".moon-icon").src =
        "./assets/images/darkmode_half-moon.svg";
    darkModeBtn.checked = true;
  } 

}

/**
 * The event handler function to retrieve the definition of a word.
 * This function is called when the search button is clicked.
 * The function makes a GET request to the API endpoint to retrieve the definition of the word.
 * The function then displays the definition of the word on the page.
 * 
 */

const searchBtn = document.querySelector(".search-btn");

searchBtn.onclick = () => {
  const wordInput = document.querySelector(".search-bar-input").value;
  /**
   * The URL for the API endpoint to retrieve the definition of a word.
   */
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;
  const word = document.getElementById("word");
  const pronouncation = document.getElementById("pronouncation");
  const synonym = document.querySelector(".synonym-list");
  const playBtn = document.querySelector(".play-btn");
  let options = { method: "GET" };
  if( wordInput !== ""){
  fetch(URL, options)
    .then((response) => {

      /**
       * If the response is not OK, throw an error.
       * Otherwise, return the JSON response.
       */
      if (!response.ok) {
        document.querySelector(".all-container").style.display = "none";
        document.querySelector(".no-definition").style.display = "flex";
        throw Error(
          response.statusText + " - " + response.url + " - " + response.status
        );
      }
      document.querySelector(".no-definition").style.display = "none";
      return response.json();
    })
    .then((data) => {
      /**
       * Extract the first 5 definitions of the word from the response.
       * Clear the previous definitions from the list container.
       * Create a list item for each definition and append it to the list container.
       */
      document.querySelector(".all-container").style.display = "block";
      const definitionNoun = data[0].meanings[0].definitions.splice(0, 5);
      const definitionVerb = data[0].meanings[1].definitions.splice(0, 5);
      const listContainerNoun = document.querySelector(".definition-list");
      const listContainerVerb = document.querySelector(".verb-definiton");
      const example = document.createElement("q");
      word.innerText = data[0].word;
      synonym.innerText = data[0].meanings[0].synonyms.join(", ");
      console.log(data);
      listContainerNoun.innerHTML = "";
      listContainerVerb.innerHTML = "";

      /**
       * Loop through the definitions and create a list item for each definition.
       * Append the list item to the list container.
       * If the definition has an example, create a <q> element and append it to the list item.
       * If the definition does not have an example, do not create the <q> element.
       * */
      for (let def = 0; def < definitionNoun.length; def++) {
        const listItem = document.createElement("li");
        listItem.innerText = definitionNoun[def].definition;
        listContainerNoun.appendChild(listItem);
      }

      for (let def = 0; def < definitionVerb.length; def++) {
        const listItem = document.createElement("li");
        listItem.innerText = definitionVerb[def].definition;

        listContainerVerb.appendChild(listItem);
      }

      if (definitionVerb[0].example !== undefined) {
        example.innerText = definitionVerb[0].example;
      } else {
        example.style.display = "none";
      }
      listContainerVerb.appendChild(example);

      //pronouncation.innerText = data[0].phonetics[0].text;
      if(data[0].phonetics[0].text !== undefined){
        pronouncation.innerText = data[0].phonetics[0].text; 

      }

      /**
       * Play the audio pronunciation of the word when the play button is clicked.
       */
      playBtn.onclick = () => {
        const audioEl = document.createElement("audio");
        audioEl.src = data[0].phonetics[0].audio;
        audioEl.play();

        console.log(audioEl);
      };

      /**
       * Displays source link for the definition of the word.
       * The link is displayed as a clickable link that opens in a new tab.
       */
      const sourceLink = (document.getElementById("src-link").innerText =
        data[0].sourceUrls[0]);
      document.getElementById("src-link").href = sourceLink;
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

const logoEl = document.getElementById("logo-img");

logoEl.onclick = () => { window.location.reload();}


/**
 * Call the functions to set up the page.
 */
fontUpdate();
SearchBoxEffect();
playBtnHoverEffect();
DarkMode();
