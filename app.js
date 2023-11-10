const fontStyle = document.querySelector('.dropdown-item');

fontStyle.addEventListener('click', ()  => {
    const dropdownBtn = document.getElementById('dropdown-btn');
    dropdownBtn.innerText = fontStyle.innerText;
});