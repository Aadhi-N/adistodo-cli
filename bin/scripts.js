import fs from 'fs';
import { saveData } from './helpers.js';
const TASK_STORAGE_PATH = './db/adistodo-database.json';

/* Create db json file if not present */
function initDatabase () {
  if (!fs.existsSync(TASK_STORAGE_PATH)) {
    console.log(`Initializing storage. \nCreated 'adistodo-database.json' file.\n`);
    saveData([]);
  }
};

export { initDatabase };