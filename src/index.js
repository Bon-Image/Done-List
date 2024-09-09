import "./style.css";
import { Project } from "./project";
import { ProjectList } from "./project-list";
import {
  createProjectListItem,
  appendToDOM,
  setupEventListener,
} from "./DOM-functions";

const addProjectButton = document.getElementById("add-project-btn");

// Initialize the ProjectList singleton
const projects = ProjectList.getInstance();

const defaultProject = new Project("Default Project");

const defaultListItem = createProjectListItem(defaultProject);
setupEventListener(defaultListItem, "click");
appendToDOM(defaultListItem, ".project-list");

// Add the default project to the ProjectList
projects.addProject(defaultProject);
