const { readFile } = require('fs');

function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      // Initialize student tracking objects
      const students = {};
      const fields = {};
      let totalStudents = 0;

      // Split data into lines and skip the header
      const lines = data.trim().split('\n').slice(1);

      lines.forEach((line) => {
        if (line) {
          const [firstname, , , field] = line.split(',');

          // Track students by field
          if (students[field]) {
            students[field].push(firstname);
          } else {
            students[field] = [firstname];
          }

          // Count students in each field
          if (fields[field]) {
            fields[field] += 1;
          } else {
            fields[field] = 1;
          }

          totalStudents += 1;
        }
      });

      // Output total number of students
      console.log(`Number of students: ${totalStudents}`);

      // Output number of students in each field
      for (const [field, count] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${count}. List: ${students[field].join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
