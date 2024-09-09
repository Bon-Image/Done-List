import { format } from "date-fns";

// DONE is an Object
// Interpretation: Represents a completed task

class Done {
  static #idCounter = 0; // Static private field

  constructor(
    title = "title",
    description = "description",
    duration = "How long did it take?",
    notes = "What can you improve?",
    date = "Finish date",
  ) {
    this.title = title;
    this.description = description;
    this.duration = duration; // Duration in hours
    this.notes = notes; // Improvement plan for the future
    this.date = new Date(); // Finished date

    Done.#idCounter += 1; // Increment the static idCounter for each instance created
  }

  // Static getter to retrieve the current idCounter
  static get idCounter() {
    return Done.#idCounter;
  }
}

export { Done };
