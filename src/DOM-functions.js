import { Project } from "./project";
import { ProjectList } from "./project-list";
import { createProject, createDoneItem } from "./utility-functions";
import { projectList } from "./index.js";

// Utility function to append element to the DOM
function appendToDOM(element, selector) {
  const target = document.querySelector(selector);
  if (!target) throw new Error(`Target "${selector}" not found in the DOM.`);
  target.appendChild(element);
}

// Utility function to set up event listeners
function setupEventListener(element, eventType, callback) {
  if (!(element instanceof HTMLElement)) {
    throw new Error("Invalid HTMLElement.");
  }
  element.addEventListener(eventType, callback);
}

// Utility function to clear or remove an element from the DOM
function clean(element) {
  if (element) element.remove();
}

// Create <li> tag for a project and return it
function createProjectListItem(project) {
  if (
    !project ||
    typeof project.name !== "string" ||
    typeof project.id !== "number"
  ) {
    throw new Error("Invalid project object");
  }
  const li = document.createElement("li");
  li.className = "project-side";
  li.setAttribute("data-id", project.id);
  li.textContent = project.name;

  // Make the project name editable upon clicking
  li.addEventListener("click", () => {
    toggleProjectEdit(li, project);
  });

  return li;
}

// Function to toggle project name edit mode
function toggleProjectEdit(li, project) {
  const isEditing = li.getAttribute("data-editing") === "true";

  if (!isEditing) {
    const input = document.createElement("input");
    input.value = li.textContent; // Set the input's value to the current project name

    li.replaceWith(input); // Replace the li element with an input field
    input.focus();

    // When the user clicks outside the input (blur event), save the changes
    input.addEventListener("blur", () => {
      const updatedContent =
        input.value.trim() === "" ? project.name : input.value;

      project.name = updatedContent; // Update the project object with the new name
      li.textContent = updatedContent; // Update the li element with the new name

      input.replaceWith(li); // Replace the input field with the updated li element
      li.setAttribute("data-editing", "false");

      // Ensure the li is still editable after being updated
      li.addEventListener("click", () => {
        toggleProjectEdit(li, project);
      });

      const projectTitle = document.querySelector(".project-title");
      projectTitle.textContent = input.value;
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.blur(); // Trigger blur event on Enter key
      }
    });

    li.setAttribute("data-editing", "true");
  }
}

// Set the project title and its data-id attribute
function setProjectTitle(event) {
  const element = event.target;
  const projectId = element.getAttribute("data-id");
  const projectHeader = document.querySelector(".project-header");

  const projectTitle = document.createElement("h2");
  projectTitle.className = "project-title";
  projectTitle.id = "project-title";

  projectTitle.textContent = element.textContent;
  projectTitle.setAttribute("data-id", projectId);

  projectHeader.appendChild(projectTitle);
}

// Initialize a new project and display it
function initializeProject() {
  const newProject = createProject();
  projectList.addProject(newProject);

  const li = createProjectListItem(newProject);
  if (!document.querySelector(`.project-${newProject.id}`)) {
    setupEventListener(li, "click", handleProjectClick);
    appendToDOM(li, ".project-list");
  } else {
    console.warn(`Project with ID ${newProject.id} already exists.`);
  }
}

// Handle click on project list item and display its details
function handleProjectClick(event) {
  const projectHeader = document.querySelector(".project-header");
  projectHeader.innerHTML = "";

  setProjectTitle(event);

  const element = event.target;
  const projectId = element.getAttribute("data-id");
  const project = projectList.findProject(Number(projectId));

  if (!project) {
    console.error("Project not found.");
    return;
  }

  const projectHeaderButton = document.querySelector(".project-header button");
  if (projectHeaderButton) clean(projectHeaderButton);

  const addTaskButton = createButton("Add Task >", "add-task-button");
  const removeProjectButton = createButton(
    "Delete Project",
    "remove-project-button",
  );

  addTaskButton.addEventListener("click", handleTaskClick);
  removeProjectButton.addEventListener("click", () => removeProject(project));

  projectHeader.appendChild(addTaskButton);
  projectHeader.appendChild(removeProjectButton);

  showProject(projectId);
}

function removeProject(project) {
  // Remove the project from the project list
  projectList.removeProject(project);

  // Remove the project from the DOM
  const projectElement = document.querySelector(`[data-id="${project.id}"]`);
  if (projectElement) projectElement.remove();

  const projectHeader = document.querySelector(".project-header");
  while (projectHeader.firstChild) {
    projectHeader.removeChild(projectHeader.firstChild);
  }

  const doneItemsWrapper = document.querySelector(".done-items-wrapper");
  doneItemsWrapper.innerHTML = "";
}

// Show project and its associated tasks or done items
function showProject(projectId) {
  const project = projectList.findProject(Number(projectId));
  if (!project || !project.doneItems) {
    console.warn(`No done items found for project ID ${projectId}`);
    return;
  }

  clean(document.querySelector(".done-items-wrapper"));

  let doneItemsWrapper = document.querySelector(".done-items-wrapper");
  if (!doneItemsWrapper) {
    doneItemsWrapper = document.createElement("div");
    doneItemsWrapper.className = "done-items-wrapper";
    appendToDOM(doneItemsWrapper, ".project-wrapper");
  }

  project.doneItems.forEach((doneItem) => {
    const doneItemDiv = createDoneItemDiv(doneItem, projectId);
    doneItemsWrapper.appendChild(doneItemDiv);
  });
}

// Create a div structure to display a done item and allow editing
function createDoneItemDiv(doneItem, projectId) {
  const doneItemDiv = document.createElement("div");
  doneItemDiv.className = "done-item";

  const titleElement = createToggleableElement(
    "p",
    doneItem.title,
    "done-item-title",
    doneItem,
    "title",
  );
  const descriptionElement = createToggleableElement(
    "p",
    `Description: ${doneItem.description}`,
    "done-item-description",
    doneItem,
    "description",
    true,
  );
  const durationElement = createToggleableElement(
    "p",
    `Duration: ${doneItem.duration}`,
    "done-item-duration",
    doneItem,
    "duration",
  );
  const notesElement = createToggleableElement(
    "p",
    `Notes: ${doneItem.notes}`,
    "done-item-notes",
    doneItem,
    "notes",
    true,
  );
  const dateElement = createToggleableElement(
    "p",
    `Completed on: ${new Date(doneItem.date).toLocaleDateString()}`,
    "done-item-date",
    doneItem,
    "date",
  );

  const removeDoneItemButton = document.createElement("button");
  removeDoneItemButton.textContent = "Delete";
  removeDoneItemButton.className = "remove-done-button";
  removeDoneItemButton.addEventListener("click", () =>
    removeDone(doneItem, projectId),
  );

  [
    titleElement,
    descriptionElement,
    durationElement,
    notesElement,
    dateElement,
    removeDoneItemButton,
  ].forEach((el) => doneItemDiv.appendChild(el));

  return doneItemDiv;
}

function removeDone(doneItem, projectId) {
  const project = projectList.findProject(Number(projectId));
  project.remove(doneItem);
  showProject(projectId);
}

// Create a toggle-able element for editing
function createToggleableElement(
  tagName,
  content,
  className,
  doneItem,
  property,
  isTextarea = false,
) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = content;

  element.addEventListener("click", () =>
    toggleEdit(element, content, doneItem, property, isTextarea),
  );
  return element;
}

// Toggle between view and edit mode for an element
function toggleEdit(element, content, doneItem, property, isTextarea) {
  const isEditing = element.getAttribute("data-editing") === "true";

  if (!isEditing) {
    const input = isTextarea
      ? document.createElement("textarea")
      : document.createElement("input");

    // Set placeholder based on the type of content
    let placeholderText = "";
    switch (property) {
      case "title":
        placeholderText = "Enter title";
        break;
      case "description":
        placeholderText = "Enter description";
        break;
      case "duration":
        placeholderText = "Enter duration (in hours)";
        break;
      case "notes":
        placeholderText = "Enter notes";
        break;
      case "date":
        placeholderText = "Enter date (DD/MM/YYYY)";
        break;
      default:
        placeholderText = "Enter appropriate value";
    }

    input.placeholder = placeholderText;
    input.value = content; // Set the current content in the input for editing
    element.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => {
      const updatedContent = input.value.trim() === "" ? content : input.value;

      if (property === "duration") {
        doneItem.duration = parseFloat(updatedContent);
        if (isNaN(doneItem.duration)) {
          console.error("Invalid duration input.");
          doneItem.duration = 0;
        }
      } else if (property === "date") {
        const parsedDate = new Date(updatedContent);
        if (isNaN(parsedDate)) {
          console.error("Invalid date input.");
        } else {
          doneItem.date = parsedDate;
        }
      } else {
        doneItem[property] = updatedContent;
      }

      element.textContent = updatedContent;
      input.replaceWith(element);
      element.setAttribute("data-editing", "false");

      const projectTitle = document.querySelector("#project-title");
      const projectId = projectTitle?.getAttribute("data-id");
      if (projectId) showProject(projectId);
    });

    element.setAttribute("data-editing", "true");
  }
}

// Create an "Add Task" button element
function createButton(textContent, className) {
  const button = document.createElement("button");
  button.textContent = textContent;
  button.className = className;
  return button;
}

// Handle adding a task to a project
function handleTaskClick() {
  const projectTitle = document.querySelector("#project-title");
  const projectId = projectTitle.getAttribute("data-id");
  if (!projectId) {
    console.error("No project ID found.");
    return;
  }

  const done = createDoneItem();
  const project = projectList.findProject(Number(projectId));
  if (project) {
    project.add(done);
    showProject(projectId);
  }
}

export {
  createProjectListItem,
  appendToDOM,
  setupEventListener,
  setProjectTitle,
  initializeProject,
  handleProjectClick,
};
