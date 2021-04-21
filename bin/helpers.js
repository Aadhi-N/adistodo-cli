import fs from 'fs';
// import { promises as fs } from 'fs';
import { getPath } from './scripts.js';
let TASK_STORAGE_PATH;

/* Get data from database.json */
async function getData() {
  try {
    TASK_STORAGE_PATH = await getPath();
    return new Promise((resolve) => {
      return resolve(fs.readFileSync(TASK_STORAGE_PATH))}).then(data => {return JSON.parse(data)})
  } 
  catch (err) {
    console.log(`Error: getData(): `, err);
  }
  
};

// return new Promise((resolve) => {
//   resolve(fs.readFileSync(TASK_STORAGE_PATH))}).then(data => {return JSON.parse(data)})
// }

/* Save data by stringifying and writing to file */
async function saveData(data) {
  TASK_STORAGE_PATH = await getPath();
  fs.writeFileSync(TASK_STORAGE_PATH, JSON.stringify(data));
  console.log(`Saved to database.`)
  list();
};

/* List all tasks */
async function list() {
  const data = await getData();
  if (data.length > 0) {
    console.table(data)
  } else {
    console.log(`No tasks added yet.`)
  }
};

/* Validate first argument after crud command; Must be index number */
async function validateTaskIndex(strTaskIndex) {
  const data = await getData(),
        index = Number(strTaskIndex),
        taskIndex = {exists: null, index};
   
  // Validate index number by type and existence in database -->
  switch(!isNaN(index) || Number.isInteger(index)) { // Is index of type Number and integer
    case true:
      switch(data[index] !== undefined) { // Does index exist in db
        case true: // Exists in db
          taskIndex.exists = true; 
          break;
        case false: // Does not exist in db
          taskIndex.exists = false; 
          break;
      }
      break;
    case false: // Index is not of type Number
      taskIndex.exists = false;
      break;
  }
    return taskIndex;
};

/* Return boolean or null for string match */
function checkTaskStatus(string) {
  if (string.toLowerCase() === "true") {
    return true;
  } else if (string.toLowerCase() === "false") {
    return false;
  } else {
    return null;
  }
};


/* Provide usage instructions */
function help() {
  return console.log(`

  \x1b[36mAdistodo:\x1b[0m
    A NodeJS cli task management app. 

  \x1b[36mUsage:\x1b[0m
    $ adistodo <add|edit|list|delete|help> <index> [task] [{true|false}]

  \x1b[36mAvailable Commands:\x1b[0m
    <add> <task>...                       # Add task. Add 1 or more tasks, separated by strings, for each task to be saved separately.
                                            Default completion status is false.  

    <edit> <index> [task] [{true|false}]  # Edit task. Provide index number of task to edit. 
                                            Provide a new task description to replace with, and/or optional completion status.
    
    <list>                                # List all tasks.
    
    <delete> <index>                      # Delete task. Provide index number of task to delete.
    
    <help>                                # Opens command line usage guide. 

  \x1b[36mExamples:\x1b[0m
  $ adistodo add "buy green apples"
  $ adistodo add "buy green apples" "check mail"
  $ adistodo edit 1 "buy red apples" 
  $ adistodo edit 1 true
  $ adistodo delete 1


  --- INCLUDE - HELP RELATED TO DB: IF IT'S NOT EMPTY ARRAY, OTHER ERRORS ETC. 

  `)
};

export { getData, saveData, list, validateTaskIndex, checkTaskStatus, help };