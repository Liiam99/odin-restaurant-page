import "./styles.css";
import loadHomeContent from "./home";

const contentContainer = document.querySelector('#content');

const homeButton = document.querySelector('.home-button');
homeButton.addEventListener('click', (e) => {
    loadPage(loadHomeContent);
    document.querySelector('.active-button').classList.remove('active-button');
    e.target.classList += ' active-button';
});


function loadPage(loadContent) {
    contentContainer.innerHTML = '';
    const content = loadContent();
    contentContainer.appendChild(content);
}

// Initial page load.
loadPage(loadHomeContent);
