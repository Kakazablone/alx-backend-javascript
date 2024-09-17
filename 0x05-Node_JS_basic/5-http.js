const http = require('http');
const { readFile } = require('fs');

const port = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      let output = '';
      const lines = data.toString().split('\n');

      for (let i = 1; i < lines.length; i += 1) { // Skip the header line
        const line = lines[i].trim();
        if (line) {
          length += 1;
          const field = line.split(',');

          const fieldName = field[3];
          const studentName = field[0];

          if (fieldName) {
            if (students[fieldName]) {
              students[fieldName].push(studentName);
            } else {
              students[fieldName] = [studentName];
            }

            if (fields[fieldName]) {
              fields[fieldName] += 1;
            } else {
              fields[fieldName] = 1;
            }
          }
        }
      }

      output += `Number of students: ${length}\n`;
      for (const [key, value] of Object.entries(fields)) {
        output += `Number of students in ${key}: ${value}. List: ${students[key].join(', ')}\n`;
      }

      resolve(output);
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');

    const databaseFile = process.argv[2];
    if (!databaseFile) {
      res.statusCode = 500;
      res.end('Database file path not provided');
      return;
    }

    countStudents(databaseFile)
      .then((output) => {
        res.end(output.trim());
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
