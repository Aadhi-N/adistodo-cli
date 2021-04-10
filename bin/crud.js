import fs from 'fs';
const TASK_STORAGE_PATH = './db/adistodo-database.json';

import { getData, saveData, validateTaskIndex, convertToBool } from './helpers.js';

/* Add task(s) */
async function add(argument) {
  const data = await getData();
  argument.forEach(item => {
    data.push({["Task Description"]: item, Completed: false});
  });
  saveData(data);
};

/* Delete task */
async function del(argument) {
  const taskIndex = await validateTaskIndex(argument[0]);
  switch (taskIndex.exists) {
    case true:
      const data = await getData();
      data.splice(taskIndex.index, 1);
      console.log(`Deleting task index #${taskIndex.index}...`)
      return saveData(data);
    case false:
      return console.log(`Error: "${argument}" is not a valid index number for deletion.`);
  }
};

/* Edit task */
async function edit(argument) {
  const taskIndex = await validateTaskIndex(argument[0]),
        data = await getData();
  let secondArg = argument[1],
      thirdArg = argument[2],
      taskCompletionStat,
      taskDescription,
      consoleOutputMsg;

  // Provided input = 1 argument
  // Format: `<edit><0>`
  if (taskIndex.exists && !secondArg?.length) { // Is secondArg.length falsy
    return consoleOutputMsg = console.log(`Error: Please provide a description for your task to edit. (E.g. $adistodo edit 1 "editing this file" false)`);
  } 
  if (!taskIndex.exists) {
    return consoleOutputMsg = console.log(`Error: Task number "${taskIndex.index}" does not exist. Please provide the correct index number to make an edit.`)
  }

  // Provided input = 3 arguments
  // Format: `<edit><index><description>[true|false]`
  if (taskIndex.exists && secondArg?.length && thirdArg?.length) {
    taskDescription = secondArg;
    taskCompletionStat = convertToBool(thirdArg);
    consoleOutputMsg = console.log(`Edited task #${taskIndex.index} --> Description: "${secondArg}", Completion Status: "${taskCompletionStat}"`)

    if (taskCompletionStat === null) { // Input for task completion (true|false) validated as not of type Truthy or Falsy
      return consoleOutputMsg = console.log('Error, provide `true` or `false` in your last argument to assign task completion status. E.g.:.....');
    } else {
      data[taskIndex.index]["Task Description"] = taskDescription;
      data[taskIndex.index].Completed = taskCompletionStat;
      return saveData(data);
    }

    // Provided input = 2 arguments
  } else if (taskIndex.exists && secondArg?.length && !thirdArg?.length) {
      taskCompletionStat = convertToBool(secondArg);
      consoleOutputMsg = console.log(`Edited task #${taskIndex.index} --> Description: "${secondArg}"`)
      
      // Format: `<edit><index>[true|false]`
      if (typeof taskCompletionStat === "boolean") { // Input for task completion (true|false) returned as Truthy or Falsy
        data[taskIndex.index].Completed = taskCompletionStat;
        return saveData(data);
      } 
      // Format: `<edit><index><description>`
      if (taskCompletionStat === null) {
        data[taskIndex.index]["Task Description"] = secondArg;
        return saveData(data);
      }
    
  } 
  return consoleOutputMsg;
};

export { add, del, edit };
