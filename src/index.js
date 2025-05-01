import "./styles.css";
import loadHomeContent from "./home";
import loadMenuContent from "./menu";

const contentContainer = document.querySelector('#content');

const navButtons = document.querySelectorAll('button');
navButtons.forEach((button) => {
    button.addEventListener('click', () => navButtonHandler(button));
});


function navButtonHandler(navButton) {
    if (navButton.className.includes('home')) {
        loadPage(loadHomeContent);
    } else if (navButton.className.includes('menu')) {
        loadPage(loadMenuContent);
    }

    document.querySelector('.active-button').classList.remove('active-button');
    navButton.classList += ' active-button';
}


function loadPage(loadContent) {
    contentContainer.innerHTML = '';
    const content = loadContent();
    contentContainer.appendChild(content);
}

// Initial page load.
loadPage(loadHomeContent);
