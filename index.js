#!/usr/bin/env node

var fs = require('fs');
const {help} = require('./helpers.js');

const TASK_STORAGE_PATH = './adistodo-database.json';

/* Create db json file if not present */
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

//are try/catch blocks important? error catching for simple funcs?
async function edit(task) {
  try {
    const taskIsValid = await validate(task);
    switch (taskIsValid.status) {
      case true:
        return console.log('case valid')
      case false:
        return console.log(`Error: "${task}" is not a valid index number for editing.`)
    }
  } catch (err) {
    console.log("There was an error editing the task", err);
  }
};

/* Validate if first arg after command is valid integer */
function validate(task) {
  const index = Number(task[0]);
    if (isNaN(index) || !Number.isInteger(index)) {
      return false;
    } else return {status: true, index} // should i make it easier to understand as index: index?
}

/* Delete task */
async function del(task) {
  const taskIsValid = await validate(task);
  switch (taskIsValid.status) {
    case true:
      const data = await getData();
      data.splice(taskIsValid.index, 1);
      return saveData(data);
    case false:
      return console.log(`Error: "${task}" is not a valid index number for deletion.`);
  }
}


initDatabase();

const command = process.argv[2];
const argument = process.argv.slice(3);

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