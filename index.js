#!/usr/bin/env node
import { initDatabase, getPath } from './bin/scripts.js'
import { list, help } from './bin/helpers.js';
import { add, del, edit } from './bin/crud.js';

const command = !!process.argv[2] ? process.argv[2] : null;
const argument = (process.argv.slice(3).length > 0) ? process.argv.slice(3) : null;

// initDatabase();
getPath();

/* Entry point to process input commands */
switch(command) {
  case "add":
    argument ? add(argument) : console.log(`Error: Please provide a task description to add.`)
    break;

  case "edit":
    argument ? edit(argument) : console.log(`Error: Please provide an index number to edit.`);
    break;

  case "delete":
    argument ? del(argument) : console.log(`Error: Please provide an index number to delete.`);
    break;

  case "list":
    argument ? console.log(`Error: Cannot process any arguments for list.`) : list();
    break;

  case "help":
    argument ? console.log(`Error: Cannot process any arguments for help.`) : help();
    break;

  default:
    console.log(`Error: Please provide a valid input. See "help" for instructions.`)
};