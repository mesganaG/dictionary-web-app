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

fontUpdate();
SearchBoxEffect();
playBtnHoverEffect();

DarkMode();
