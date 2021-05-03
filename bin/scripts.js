import fs from 'fs';
import { saveData } from './helpers.js';

// const homedir = os.homedir();
const TASK_STORAGE_PATH = '../adistodo-database.json';

/* Create db */
function initDatabase() {
  if (!fs.existsSync(TASK_STORAGE_PATH)) {
    console.log(`Initializing storage. \nCreated 'adistodo-database.json' file.\n`);
    saveData([]); //DB by default must have empty array 
  }
};


export { initDatabase, TASK_STORAGE_PATH };