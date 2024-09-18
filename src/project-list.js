class ProjectList {
  static instance = null;

  constructor() {
    if (ProjectList.instance) {
      throw new Error(
        "Use ProjectList.getInstance() to get the ProjectList instance.",
      );
    }

    this.list = [];
  }

  static getInstance() {
    if (ProjectList.instance === null) {
      ProjectList.instance = new ProjectList();
    }
    return ProjectList.instance;
  }

  showData() {
    if (this.list.length > 0) {
      console.log(this.list);
    } else {
      console.log("No projects in the list.");
    }
  }

  addProject(project) {
    this.list.push(project);
    console.log(`Project "${project.name}" added.`);
  }

  /**
   * Removes a project by ID.
   *
   * @param {Object} project - The project object to remove.
   * @param {number} project.id - The unique ID of the project.
   * @returns {void}
   */
  removeProject(project) {
    const found = this.findProject(project.id); // Pass project.id
    if (found) {
      // Filter out the project and update the list in place
      this.list = this.list.filter((item) => item.id !== project.id);
      console.log(`Project with ID ${project.id} removed.`);
    } else {
      console.log(`Project with ID ${project.id} not found, unable to remove.`);
    }
  }

  /**
   * Find a project by ID.
   *
   * @param {number} id - The unique ID of the project to find.
   * @returns {Object|null} The found project or null if no project is found.
   */
  findProject(id) {
    const found = this.list.find((item) => item.id === Number(id)); // Ensure `id` is a number
    if (found) {
      return found;
    } else {
      console.log(`Project with ID ${id} not found.`);
      return null;
    }
  }

  static checkExistence() {
    return ProjectList.instance !== null;
  }
}

export { ProjectList };
