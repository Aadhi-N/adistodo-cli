import fs from 'fs';
import { TASK_STORAGE_PATH } from './scripts.js';

/* Get data from database.json */
function getData() {
  return new Promise((resolve) => {
    return resolve(fs.readFileSync(TASK_STORAGE_PATH))})
      .then(data => {return JSON.parse(data)})
      // .catch(console.log(`No tasks added yet.`));
}; 


/* Save data by stringifying and writing to file */
function saveData(data) {
  fs.writeFileSync(TASK_STORAGE_PATH, JSON.stringify(data));
  console.log(`Saved to database.`)
  list();
};

async function list() {
  const data = await getData();
  console.table(data);
}



/* Validate first argument after crud command; Must be index number */
async function validateTaskIndex(index) {
  const data = await getData()
 
  // Validate index number by type and existence in database -->
  if (!isNaN(Number(index)) || Number.isInteger(index)) { // Is index of type Number and integer
    if (data[index]) return true;
  } 
  return false;
};

/* Return boolean or null for string match */
function checkTaskStatus(string) {
  if (string.toLowerCase() === "true") return true;
  if (string.toLowerCase() === "false") return false;
  return null;
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

  `)
};

export { getData, saveData, list, validateTaskIndex, checkTaskStatus, help };