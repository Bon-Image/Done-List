import "./style.css";
import { initializeProject } from "./DOM-functions";
import { Project } from "./project";
import { ProjectList } from "./project-list";

const addProjectButton = document.getElementById("add-project");

const projetcs = new ProjectList();
const defaultProject = new Project("Default Project");

initializeProject(defaultProject, projetcs);

addProjectButton.addEventListener("click", (event) =>
  initializeProject("New Project", projetcs),
);
