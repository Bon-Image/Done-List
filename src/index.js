import "./style.css";
import { Project } from "./project";
import { ProjectList } from "./project-list";
import {
  createProjectListItem,
  appendToDOM,
  setupEventListener,
  setProjectTitle,
  initializeProject,
} from "./DOM-functions";

// Initialize the ProjectList singleton
const projectList = ProjectList.getInstance();

const addProjectButton = document.querySelector(".add-project-btn");
setupEventListener(
  addProjectButton,
  "click",
  initializeProject.bind(null, projectList),
);
initializeProject("Default Project");
document.getElementById("year").textContent = new Date().getFullYear();
// const defaultProject = new Project("Default Project");
// projectList.addProject(defaultProject);
// const defaultListItem = createProjectListItem(defaultProject);
// setupEventListener(defaultListItem, "click", setProjectTitle);
// appendToDOM(defaultListItem, ".project-list");

// // Add the default project to the ProjectList
// projectList.addProject(defaultProject);

export { projectList };
