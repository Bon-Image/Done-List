/**
 * Represents a List of all projects.
 *
 * @class ProjectList
 * @classdesc Represents a list of all projects, where each project contains a list of done items.
 */
class ProjectList {
  // Singleton instance of ProjectList
  static instance = null;

  constructor() {
    if (ProjectList.instance) {
      throw new Error(
        "Use ProjectList.getInstance() to get the ProjectList instance.",
      );
    }
    /**
     * The list of projects.
     * @type {Array<Object>}
     */
    this.list = [];
  }

  /**
   * Get the singleton instance of the ProjectList.
   *
   * @returns {ProjectList} The singleton instance of the ProjectList.
   */
  static getInstance() {
    if (ProjectList.instance === null) {
      ProjectList.instance = new ProjectList();
    }
    return ProjectList.instance;
  }

  /**
   * Display all projects in the list.
   *
   * @returns {void}
   */
  showData() {
    if (this.list.length > 0) {
      console.log(this.list);
    } else {
      console.log("No projects in the list.");
    }
  }

  /**
   * Add a project to the list.
   *
   * @param {Object} project - The project object to add.
   * @param {number} project.id - The unique ID of the project.
   * @param {string} project.name - The name of the project.
   * @returns {void}
   */
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
    const found = this.findProject(project);
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
   * @param {Object} project - The project to find.
   * @param {number} project.id - The unique ID of the project to find.
   * @returns {Object|null} The found project or null if no project is found.
   */
  findProject(project) {
    const found = this.list.find((item) => item.id === project.id);
    if (found) {
      return found;
    } else {
      console.log(`Project with ID ${project.id} not found.`);
      return null;
    }
  }

  /**
   * Check whether a singleton instance exists.
   *
   * @returns {boolean} True if the instance exists, false otherwise.
   */
  static checkExistence() {
    return ProjectList.instance !== null;
  }
}

export { ProjectList };
