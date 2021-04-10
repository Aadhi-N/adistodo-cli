#!/usr/bin/env node
import { initDatabase } from './bin/scripts.js'
import { getData, saveData, list, help } from './bin/helpers.js';
import { add, del, edit } from './bin/crud.js';

const command = !!process.argv[2] ? process.argv[2] : null;
const argument = (process.argv.slice(3).length > 0) ? process.argv.slice(3) : null;
initDatabase();

/* Entry point to process input commands */
switch(command) {
  case "add":
    argument ? add(argument) : console.log('provide argument for add')
    break;

  case "edit":
    argument ? edit(argument) : console.log('need input for edit');
    break;

  case "delete":
    argument ? del(argument) : console.log('need input for del');
    break;

  case "list":
    argument ? console.log('cant process arg for list') : list();
    break;

  case "help":
    argument ? console.log('cant process arg for help') : help();
    break;

  default:
    console.log("Please provide a valid command.");
};