// DONE is an Object 
// Interpretation: Represents a completed task 

class Done {

    constructor (title, deccription, duration, notes, tags, date) {

        this.title = title; 
        this.deccription = deccription; 
        this.duration = duration; // duration in hours 
        this.notes = notes; // improvemnt plan for the future 
        this.tags = tags // A list of names (Project Names)
        this.date = date; // Finished Date 

    }

}; 


export {Done}; 