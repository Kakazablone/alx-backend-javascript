process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  process.stdout.write(`Your name is: ${input}\n`);
  process.exit();
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});

module.exports = {}; // For testing purposes
