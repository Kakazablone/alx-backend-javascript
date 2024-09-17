// full_server/utils.js
import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }
      const lines = data.trim().split('\n');
      const students = {};

      for (const line of lines.slice(1)) {
        if (line) {
          const [firstName, , , field] = line.split(',');
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstName);
        }
      }
      resolve(students);
    });
  });
}

export default readDatabase;
