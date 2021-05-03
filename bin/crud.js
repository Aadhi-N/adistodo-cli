import { getData, saveData, validateTaskIndex, checkTaskStatus } from './helpers.js';

/* Add task(s) */
async function add(args) {
  const data = await getData();
  args.forEach(item => {
    data.push({["Task Description"]: item, Completed: false});
    console.log(`Added task --> Description: ${item}`)
  });
  saveData(data);
};

/* Delete task */
async function del(index) {
  const indexExists = await validateTaskIndex(index[0]);
  if (indexExists) {
    const data = await getData();
    console.log(`Deleted task index #${index[0]} --> Description: ${data[index[0]]["Task Description"]}`);
    data.splice(index, 1);
    return saveData(data);
  } else {
    return console.error(`Error: "${args}" is not a valid index number for deletion.`);
  }
};

/* Edit task */
async function edit(args) {
  
  const [index, ...taskDescription] = args,
        indexExists = await validateTaskIndex(index),
        data = await getData();
  let taskStatus; 

  // Provided input = only index number
  // Format: `<edit> <0>`
  if (!indexExists) {
    return console.error(`Error: Task number "${index}" does not exist. Please provide the correct index number to make an edit.`)
  }
  if (indexExists && !taskDescription?.length) { // Is editableInputs.length falsy?
    return console.error(`Error: Please provide a description for your task to edit. (E.g. $adistodo edit 1 "editing this file" false)`);
  } else {
    //Provided input = index number AND task description OR boolean
    if (taskDescription.length === 1) {
      taskStatus = checkTaskStatus(taskDescription[0]); //check if task description is a boolean
      // Format: `<edit> <index> [true|false]`
      if (typeof taskStatus === "boolean") { // Input for task completion (true|false) returned as Truthy or Falsy
        data[index].Completed = taskStatus;
        return saveData(data);
      } 
      // Format: `<edit> <index> <description>`
      if (taskStatus === null) {
        data[index]["Task Description"] = taskDescription[0];
        return saveData(data);
      }
    };

    if (taskDescription.length === 2) {
      // Provided input = index number AND task description AND task status
      taskStatus = checkTaskStatus(taskDescription[1]); //check if task description is a boolean
      // Format: `<edit> <index> <description> [true|false]`
      if (taskStatus === null) { // Input for task completion (true|false) validated as not of type Truthy or Falsy
        return console.error(`Error: Provide "true" or "false" in your last argument to assign task completion status, or leave empty. See help for instructions on editing.`);
      } else {
        data[index]["Task Description"] = taskDescription[0];
        data[index].Completed = taskStatus;
        saveData(data);
        return console.log(`Edited task #${index} --> Description: "${taskDescription[0]}", Completion Status: "${taskStatus}"`)
      }
    } else {
      console.error(`Error: Too many arguments provided. See help for instructions on editing.`)
    }
  };
};

export { add, del, edit };
