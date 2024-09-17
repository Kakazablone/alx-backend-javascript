const fs = require('fs');

function countStudents(fileName) {
  try {
    // Read the file synchronously
    const content = fs.readFileSync(fileName, 'utf-8');

    // Split the content into lines
    const lines = content.trim().split('\n');

    // Remove the header line and initialize structures
    const students = {};
    const fields = {};
    const studentData = lines.slice(1); // Skip the header line

    studentData.forEach((line) => {
      if (line) {
        const [firstname, , , field] = line.split(',');

        // Track students in their respective fields
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
      }
    });

    // Calculate total number of students
    const totalStudents = Object.values(fields).reduce((sum, count) => sum + count, 0);
    console.log(`Number of students: ${totalStudents}`);

    // Log each field's student count and list
    for (const [field, count] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${count}. List: ${students[field].join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
