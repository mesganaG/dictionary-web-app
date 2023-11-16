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

function SearchBoxEffect() {
  const inputText = document.querySelector(".search-bar-input");
  const inputContainer = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".search-btn");
  const displayError = document.querySelector("p");
  inputText.addEventListener("click", function () {
    inputContainer.style.border = "1px solid #A445ED";
    searchBtn.addEventListener("click", function () {
      if (inputText.value === "") {
        inputContainer.style.border = "1px solid #FF5252";
        displayError.style.display = "block";
      } else {
        inputContainer.style.border = "0px";
      }
    });
    displayError.style.display = "none";
  });
}
function playBtnHoverEffect() {
  const playBtnImg = document.querySelector(".btn-img");

  playBtnImg.addEventListener("mouseover", () => {
    playBtnImg.src = "./assets/images/icon-play-active.svg";
  });

  playBtnImg.addEventListener("mouseout", () => {
    playBtnImg.src = "./assets/images/icon-play.svg";
  });
}
// Dark mode
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
}

// API calls
const searchBtn = document.querySelector(".search-btn");
searchBtn.onclick = () => {

  
  const wordInput = document.querySelector(".search-bar-input").value;
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;
  const word = document.getElementById("word");
  const pronouncation = document.getElementById("pronouncation");
  const partOfSpeechVerb = document.getElementById("part-of-speech-verb");
  const partOfSpeechNoun = document.getElementById("part-of-speech-noun");
  const synonym = document.querySelector(".synonym-list");
  let options = { method: "GET" };
  fetch(URL, options)
    .then((response) => {
      if (!response.ok) {
        document.querySelector(".all-container").style.display = "none";
        throw Error(
          response.statusText + " - " + response.url + " - " + response.status
        );
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".all-container").style.display = "block";
      const definitionNoun = data[0].meanings[0].definitions;
      const definitionVerb = data[0].meanings[1].definitions;
      const listContainerNoun = document.querySelector(".definition-list");
      const listContainerVerb = document.querySelector(".verb-definiton");
      word.innerText = data[0].word;
      pronouncation.innerText = data[0].phonetics[0].text;
      partOfSpeechNoun.innerText = data[0].meanings[0].partOfSpeech;
      partOfSpeechVerb.innerText = data[0].meanings[1].partOfSpeech;
      synonym.innerText = data[0].meanings[0].synonyms.join(", ");
      console.log(data);
      listContainerNoun.innerHTML = "";
      listContainerVerb.innerHTML = "";
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
    })
    .catch((error) => {
      console.log(error);
    });
};

fontUpdate();
SearchBoxEffect();
playBtnHoverEffect();

DarkMode();
