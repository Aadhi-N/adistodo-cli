import { getData, saveData, validateTaskIndex, checkTaskStatus } from './helpers.js';

/* Add task(s) */
async function add(args) {
  try {
    const data = await getData();
    args.forEach(item => {
      data.push({["Task Description"]: item, Completed: false});
      console.log(`Added task --> Description: ${item}`)
    });
    saveData(data);
  } catch (err) {
    console.log(`Error: `, err);
  }
  
};

/* Delete task */
async function del(args) {
  const taskIndex = await validateTaskIndex(args[0]);
  switch (taskIndex.exists) {
    case true:
      const data = await getData();
      console.log(`Deleted task index #${taskIndex.index} --> Description: ${data[taskIndex.index]["Task Description"]}`);
      data.splice(taskIndex.index, 1);
      return saveData(data);
    case false:
      return console.error(`Error: "${args}" is not a valid index number for deletion.`);
  }
};

/* Edit task */
async function edit(args) {
  console.log('edit args', args)

  const taskIndex = await validateTaskIndex(args[0]),
        data = await getData();
  let secondArg = args[1], //confusing //argsS
      thirdArg = args[2],
      taskStatus,
      taskDescription,
      consoleOutputMsg;

  // Provided input = 1 args
  // Format: `<edit> <0>`
  if (!taskIndex.exists) {
    return consoleOutputMsg = console.log(`Error: Task number "${args[0]}" does not exist. Please provide the correct index number to make an edit.`)
  }
  if (taskIndex.exists && !secondArg?.length) { // Is secondArg.length falsy
    return consoleOutputMsg = console.log(`Error: Please provide a description for your task to edit. (E.g. $adistodo edit 1 "editing this file" false)`);
  } 

  // Provided input = 3 argss
  // Format: `<edit> <index> <description> [true|false]`
  if (taskIndex.exists && secondArg?.length && thirdArg?.length) { //argss.length === 3
    taskDescription = secondArg;
    taskStatus = checkTaskStatus(thirdArg);
    
    if (taskStatus === null) { // Input for task completion (true|false) validated as not of type Truthy or Falsy
      return consoleOutputMsg = console.log(`Error, provide "true" or "false" in your last args to assign task completion status, or leave empty.`);
    } else {
      data[taskIndex.index]["Task Description"] = taskDescription;
      data[taskIndex.index].Completed = taskStatus;
      saveData(data);
      return console.log(`Edited task #${taskIndex.index} --> Description: "${secondArg}", Completion Status: "${taskStatus}"`)
    }

    // Provided input = 2 argss
  } else if (taskIndex.exists && secondArg?.length && !thirdArg?.length) {
      taskStatus = checkTaskStatus(secondArg);
      consoleOutputMsg = console.log(`Edited task #${taskIndex.index} --> Description: "${secondArg}"`)
      
      // Format: `<edit> <index> [true|false]`
      if (typeof taskStatus === "boolean") { // Input for task completion (true|false) returned as Truthy or Falsy
        data[taskIndex.index].Completed = taskStatus;
        return saveData(data);
      } 
      // Format: `<edit> <index> <description>`
      if (taskStatus === null) {
        data[taskIndex.index]["Task Description"] = secondArg;
        return saveData(data);
      }
    
  } 
  return consoleOutputMsg;
};

export { add, del, edit };
