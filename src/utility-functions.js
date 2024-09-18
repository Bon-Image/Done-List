import { Project } from "./project";
import { format } from "date-fns";
import { Done } from "./done";

// Purpose: Create a Project Object
// Signature: String -> Project
// Example(s) : createProject('Home Remdoel');

function createProject(name) {
  if (name) {
    const project = new Project(name);
    return project;
  } else {
    const newProject = new Project("New Project");
    const projectId = newProject.id;
    newProject.name = `Project ${projectId}`;
    return newProject;
  }
}

function createDoneItem() {
  const done = new Done();
  return done;
}

// Purpose: Fetch the current date down to minute
// Signature: void -> String
// Example(s) -> fetchDate() -> 2024-08-29 11:08

function fetchDate() {
  const now = new Date();
  const formatedDate = format(now, "yyyy-MM-dd HH:mm");

  return formatedDate;
}

export { createProject, createDoneItem };
