import fs from 'fs';
import os from 'os';

const homedir = os.homedir();
let TASK_STORAGE_PATH;

/* Set path of DB in user root directory */
function setPath() {
  return TASK_STORAGE_PATH = `${os.homedir()}/adistodo-db/adistodo-db.json`;
};

/* Get path where DB is stored */
async function getPath() {
  try {
    await setPath();
    if (!fs.existsSync(TASK_STORAGE_PATH)) {
      initDatabase();
    } else {
      return TASK_STORAGE_PATH;
    }
  } catch (err) {
    console.log('Error...', err)
  }
};

/* Create db json file if not present */
async function initDatabase () {
  fs.mkdir(`${homedir}/adistodo-db`, function(err) {
    if (err) {
      console.log(`Error: initDatabase(): Failed to create "adistodo-db" directory in user's root directory.`, err)
    } else {
      fs.writeFileSync(`${TASK_STORAGE_PATH}`, JSON.stringify([]));
      if (err) {
          console.log(`Error: initDatabase(): Could not write to "adistodo-db.json".`, err);
      } else {
          console.log('Created database.');
      }
    }
  })
};

export { initDatabase, getPath };