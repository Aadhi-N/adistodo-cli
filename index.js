#!/usr/bin/env node

import { initDatabase } from './bin/scripts.js'
import { help, getData, list } from './bin/helpers.js';
import { add, del, edit } from './bin/crud.js';

const input = process.argv.slice(2);

const [command, ...args] = input; //elements after input[0] assigned to args


/* Entry point to process input commands */
switch(command) {
  case "add":
    !args.length ? console.error(`Error: Please provide a task description to add.`) : add(args);
    break;

  case "edit":
    !args.length ? console.error(`Error: Please provide an index number to edit.`) : edit(args);
    break;

  case "delete":
    !args.length ? console.error(`Error: Please provide an index number to delete.`) : del(args);
    break;

  case "list":
    !args.length ? list() : console.error(`Error: Cannot process any extra arguments for "list".`);
    break;

  case "help":
    !args.length ? help() : console.error(`Error: Cannot process any extra arguments for "help".`);
    break;

  default:
    console.error(`Error: Please provide a valid input. See "help" for instructions.`)
};

/* Checks if DB exists */
initDatabase();