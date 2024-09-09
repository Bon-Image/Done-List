import { Done } from "./done.js";

/**
 * Represents a Project.
 * @class Project
 * @classdesc Contains a list of all Done items.
 */
class Project {
  static idCounter = 0;

  /**
   * Creates an instance of Project.
   *
   * @param {String} name - The name of the project.
   */
  constructor(name) {
    /**
     * The name of the project.
     * @type {String}
     */
    this.name = name;

    /**
     * List of all Done items in the project.
     * @type {Array<Done>}
     */
    this.doneItems = [];

    /**
     * Unique ID of the project.
     * @type {number}
     */
    this.id = ++Project.idCounter; // Incrementing the ID for each new project
  }

  /**
   * Adds a Done item to the project.
   *
   * @param {Done} done - The Done item to add.
   * @returns {void}
   * @throws {Error} Will throw an error if the argument is not an instance of Done.
   */
  add(done) {
    if (done instanceof Done) {
      this.doneItems.push(done);
      console.log("A new Done item has been added to the project.");
    } else {
      throw new Error(`The object provided is not an instance of Done.`);
    }
  }

  /**
   * Removes a Done item from the project.
   *
   * @param {Done} done - The Done item to remove.
   * @returns {void}
   */
  remove(done) {
    const taskToRemove = this.findDone(done);

    if (taskToRemove) {
      // Find index and remove the task
      const index = this.doneItems.indexOf(taskToRemove);
      this.doneItems.splice(index, 1);
      console.log(`Done item with ID ${done.id} removed from the project.`);
    } else {
      console.log("Task not found in the project.");
    }
  }

  /**
   * Finds a Done item by ID in the project.
   *
   * @param {Done} done - The Done item to find.
   * @returns {Done|null} The found Done item or null if not found.
   */
  findDone(done) {
    const found = this.doneItems.find((item) => item.id === done.id);
    if (found) {
      return found;
    } else {
      console.log(`Done item with ID ${done.id} not found.`);
      return null;
    }
  }
}

export { Project };
