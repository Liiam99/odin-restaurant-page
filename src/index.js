import "./styles.css";
import loadHomeContent from "./home";

const content = document.querySelector('#content');
const home = loadHomeContent();
content.appendChild(home);
