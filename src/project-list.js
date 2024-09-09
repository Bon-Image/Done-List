class ProjectList {
  constructor() {
    if (ProjectList.instance) {
      return ProjectList.instance; // Return existing instance
    }

    this.projects = []; // Initialize project array
    ProjectList.instance = this; // Set the instance
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }
}

export { ProjectList };
