import fs from 'fs';
const TASK_STORAGE_PATH = './db/adistodo-database.json';


/* Get data from database.json */
function getData() {
  return new Promise((resolve) => resolve(fs.readFileSync(TASK_STORAGE_PATH))).then(data => {return JSON.parse(data)})
};

/* Save data by stringifying and writing to file */
async function saveData(data) {
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

function convertToBool(string) {
  let regex=/^\s*(true|false)\s*$/g // Match with string "true" or "false"; Excludes case-sensitive and white space; Match returns true
  let match = string.match(regex);

  // If string contains true or false, return in boolean form, else return null
  return (match === null) ? null : (match.toString() === "true") ? true : false
};


/* Provide usage instructions */
function help() {
  return console.log(`
  Usage
  $ adistodo <add|edit|list|delete|help>  [task]

  Commands:
  <add> <task [...tasks]> - must wrap in strings
  <edit> [task index number] [task description] [check: true | false] - edit task description; by default, if true/false not supplied, it's false
  <delete>
  <list>
  <help>

  Examples
  $ adistodo add "pick up groceries"

  // 2 if statements; store results in array; print results as return object
  // ONLY accept 3 arguments; 
  //if 3rd argument is undefined, mark as default "false"
  //if 2nd argument is "true/false", mark completed as true/false
  //if arguments empty, throw error - supply correct info
  

  `)
};


export { getData, saveData, list, validateTaskIndex, convertToBool, help };