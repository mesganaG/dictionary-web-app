function fontUpdate(){
    const fontStyle = document.querySelectorAll('.dropdown-item');
    const dropdownBtn = document.querySelector('#dropdown-btn');
    for(let font of fontStyle){
    font.addEventListener('click', function(){
       const fontName = font.textContent;    
       dropdownBtn.innerText = fontName;
    });
    }

}
function searchOutlineUpdate(){
    const inputText = document.querySelector('.search-bar-input');
    const inputContainer = document.querySelector('.search-bar');
    const searchBtn = document.querySelector('.search-btn');
    const displayError = document.querySelector('.display-error');
    inputText.addEventListener('click', function(){
    inputContainer.style.border = '1px solid #A445ED';
    
    searchBtn.addEventListener('click', function(){
        if(inputText.value === ''){
            inputContainer.style.border = '1px solid #FF5252';
            displayError.style.display = 'block';

        } else {
            inputContainer.style.border = '0px';
           
        }
    });
    displayError.style.display = 'none';

});
}


fontUpdate();
searchOutlineUpdate();