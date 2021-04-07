#!/usr/bin/env node

var fs = require('fs');
const { get } = require('http');
const {help} = require('./helpers.js');

const TASK_STORAGE_PATH = './adistodo-database.json';

/* Create db json file if not present */
// find way to run once program initiated, not at every instance
function initDatabase() {
  if (!fs.existsSync(TASK_STORAGE_PATH)) {
    console.log(`Initializing storage. \nCreated 'adistodo-database.json' file.\n`);
    saveData([]);
  }
};

/* Save data by stringifying and writing to file */
function saveData(data) {
  fs.writeFileSync(TASK_STORAGE_PATH, JSON.stringify(data));
  console.log("Saved to database.")
  list();
}

/* Get data from database.json */
function getData() {
  return new Promise((resolve) => resolve(fs.readFileSync(TASK_STORAGE_PATH))).then(data => {return JSON.parse(data)})
}

/* List all tasks */
// list specific task
async function list() {
  try {
    const data = await getData();
    if (data.length > 0) {
      console.table(data)
    } else {
      console.log("No tasks added yet.")
    }
  } catch (err) {
    console.log("There was an error retrieving task list", err);
  }
};

/* Add task(s) to database */
async function add(tasks) {
  const data = await getData();
  tasks.forEach(item => {
    data.push({["Task Description"]: item, Completed: false});
  });
  fs.writeFileSync(TASK_STORAGE_PATH, JSON.stringify(data));
  list();
};

/* Edit task */
async function edit(task) {
  const taskIsValid = await validate(task[0]);
  const data = await getData();
  let arr;

  console.log('edit', task)

  // 2 if statements; store results in array; print results as return object
  // ONLY accept 3 arguments; 
  //if 3rd argument is undefined, mark as default "false"
  //if 2nd argument is "true/false", mark completed as true/false
  //if arguments empty, throw error - supply correct info
  
  if (taskIsValid.status) {

  } else {
     arr = console.log(`Error: Task number "${task[0]}" does not exist. Please provide the correct index number to make an edit.`)
  }

  if (task.length === 3) {
    console.log('check', taskComplete)


  } else if (task.length === 2) {
      taskComplete = convertToBool(task[1]);
      if (typeof taskComplete === "boolean") {
        data[taskIsValid.index].Completed = taskComplete;
        return saveData(data);
      } 

      if (taskComplete === null) {
        data[taskIsValid.index]["Task Description"] = task[1];
        return saveData(data);
      }

  } else if (task.length === 1) {
    arr = console.log(`Error: Please provide an edit for your task. (E.g. $adistodo edit 1 "editing this file" false)`);
  } else {
    arr = console.log(`Error: Too many arguments provided. Please input an edit for only 1 task. (E.g. $adistodo edit 1 "editing this file" false)`);
  }
  return arr;
  
};

function convertToBool(string) {
  let regex=/^\s*(true|false)\s*$/g //match with string "true" or "false", excludes case-sensitive and white space; match returns true
  let match = string.match(regex);

  //if string contains true or false, return in boolean form, else return null
  return (match === null) ? null : (match.toString() === "true") ? true : false
};

function taskStatus() {
  
}

//edit 0 "edited" false
// edit 0 = supply new task description to edit
//edit 0 "edited"
//edit 0 true 

/* Validate if first arg after command is valid integer */
async function validate(taskIdx) {
  const data = await getData(),
        index = Number(taskIdx),
        taskIsValid = {status: null, index};
   
  // Validate index number by type and existence in database -->
  switch(!isNaN(index) || Number.isInteger(index)) { //if number is true number type and integer
    case true:
      switch(data[index] !== undefined) { //does number exist in db
        case true: //exists in db
          taskIsValid.status = true; 
          break;
        case false: //doesnt exist in db
          taskIsValid.status = false; 
          break;
      }
      break;
    case false: //number is not type number
      taskIsValid.status = false;
      break;
  }

    return taskIsValid;
};

/* Delete task */
async function del(task) {
  const taskIsValid = await validate(task[0]);
  switch (taskIsValid.status) {
    case true:
      const data = await getData();
      data.splice(taskIsValid.index, 1);
      return saveData(data);
    case false:
      return console.log(`Error: "${task}" is not a valid index number for deletion.`);
  }
};


initDatabase();

const command = process.argv[2];
const argument = process.argv.slice(3);

// Convert this into hash map?
switch(command) {
  case "add":
    add(argument);
    break;

  case "edit":
    edit(argument);
    break;

  case "list":
    list();
    break;

  case "delete":
    del(argument);
    break;

  case "help":
    help();
    break;

  default:
    console.log("Please provide a valid command.");
    help();
};

