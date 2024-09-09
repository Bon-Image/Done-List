import { format } from "date-fns";

/**
 * Represents a completed task.
 *
 * @class Done
 * @classdesc Represents a task with five attributes: title, description, duration, notes, and date.
 */
class Done {
  /**
   * Static ID counter for each Done instance.
   * @type {number}
   * @static
   */
  static idCounter = 0;

  /**
   * Creates an instance of Done.
   *
   * @param {string} title - The title of the completed task.
   * @param {string} description - A description of the task.
   * @param {number} duration - The duration (in hours) spent on the task.
   * @param {string} notes - Notes for improvement or reflection on the task.
   * @param {Date} date - The date the task was completed.
   */
  constructor(
    title = "Untitled Task",
    description = "No description provided",
    duration = 0, // Duration should be a number, default is 0 hours
    notes = "No improvement notes",
    date = new Date(), // Default to the current date
  ) {
    /**
     * Unique ID for this task.
     * @type {number}
     */
    this.id = ++Done.idCounter;

    /**
     * Title of the task.
     * @type {string}
     */
    this.title = title;

    /**
     * Description of the task.
     * @type {string}
     */
    this.description = description;

    /**
     * Duration (in hours) spent on the task.
     * @type {number}
     */
    this.duration = duration;

    /**
     * Notes for improvement or reflection on the task.
     * @type {string}
     */
    this.notes = notes;

    /**
     * Date when the task was completed.
     * @type {Date}
     */
    this.date = date instanceof Date ? date : new Date(); // Ensure it's a Date object

    /**
     * Formatted date string.
     * @type {string}
     */
    this.formattedDate = format(this.date, "yyyy-MM-dd"); // Format the date using date-fns
  }

  /**
   * Returns the static ID counter for Done instances.
   *
   * @returns {number} The current value of the static idCounter.
   */
  static getIdCounter() {
    return Done.idCounter;
  }

  /**
   * Displays a summary of the task details.
   *
   * @returns {string} Summary of the task with title, duration, and formatted date.
   */
  getSummary() {
    return `Task: ${this.title}, Duration: ${this.duration} hours, Completed on: ${this.formattedDate}`;
  }
}

export { Done };
