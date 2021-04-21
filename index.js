#!/usr/bin/env node

import { getPath } from './bin/scripts.js'
import { list, help } from './bin/helpers.js';
import { add, del, edit } from './bin/crud.js';

const input = process.argv.slice(2);
const [command, ...args] = input.length > 0 ? input : null; //elements after input[0] assigned to args

// console.log(input)
// console.log('c', command)
// console.log('a', args)

/* Checks if DB exists */
getPath();

/* Entry point to process input commands */
switch(command) {
  case "add":
    args ? add(args) : console.error(`Error: Please provide a task description to add.`)
    break;

  case "edit":
    args ? edit(args) : console.error(`Error: Please provide an index number to edit.`);
    break;

  case "delete":
    args ? del(args) : console.error(`Error: Please provide an index number to delete.`);
    break;

  case "list":
    args ? console.error(`Error: Cannot process any extra arguments for "list".`) : list();
    break;

  case "help":
    args ? console.error(`Error: Cannot process any extra arguments for "help".`) : help();
    break;

  default:
    console.error(`Error: Please provide a valid input. See "help" for instructions.`)
};