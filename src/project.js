import Done from "./done.js";

// Project is an object that contains a set of Done objects
class Project {
  static idCounter = 0;

  constructor(name) {
    this.name = name;
    this.doneItems = [];
    this.id = ++Project.idCounter; // incrementing the ID for each new project
  }

  add(done) {
    this.doneItems.push(done);
  }

  remove(done) {
    // Find the task by ID
    const taskToRemove = this.doneItems.find((task) => task.id === done.id);

    if (taskToRemove) {
      // If task is found, remove it
      const index = this.doneItems.indexOf(taskToRemove);

      if (index !== -1) {
        this.doneItems.splice(index, 1);
      }
    } else {
      console.log("Task not found");
    }
  }
}

export { Project };
