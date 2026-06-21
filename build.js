/* eslint-disable @typescript-eslint/no-require-imports */
const { spawn } = require('child_process');
const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });

build.on('close', (code) => {
  console.log(`Build exited with code ${code}`);
  process.exit(code);
});

build.on('error', (err) => {
  console.error('Error spawning build:', err);
  process.exit(1);
});