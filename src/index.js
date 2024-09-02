import "./style.css"; 
import { editProjectName , saveProjectName} from "./DOM-functions";

const projectNames = document.getElementsByClassName('project-name');
const inputs = document.getElementsByClassName('edit-input'); 

// Convert the HTMLCollection to an array (optional) and add event listeners to each element
Array.from(projectNames).forEach((projectName) => {

    projectName.addEventListener('click', (event) => editProjectName(event.target));

});


Array.from(inputs).forEach(input => {

    input.addEventListener('blur', (event) => saveProjectName(event.target)); 

}); 



