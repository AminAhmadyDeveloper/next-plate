import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const typesFolderPath = path.resolve(__dirname, '..', 'types');

if (!fs.existsSync(typesFolderPath)) {
  fs.mkdirSync(typesFolderPath, { recursive: true });
  console.log('[script]: created types folder.');
}

const extractAosAnimationsScriptPath = path.resolve(
  __dirname,
  'extract-aos-animations.js',
);

const generateIconsTypes = path.resolve(__dirname, 'generate-icon-types.js');

exec(`bun ${extractAosAnimationsScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the script: ${error.message}`);
    return;
  }
  if (stderr) {
    if (!stderr.includes('tailwind')) {
      console.error(`stderr: ${stderr}`);
    } else {
      console.log('[extract aos animations]: types exported successfully');
    }
    return;
  }
  console.log(`stdout: ${stdout}`);
});

exec(`bun ${generateIconsTypes}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the script: ${error.message}`);
    return;
  }
  if (stderr) {
    if (!stderr.includes('tailwind')) {
      console.error(`stderr: ${stderr}`);
    } else {
      console.log('[phosphor icons]: created successfully with icon types.');
    }
    return;
  }
  console.log(`stdout: ${stdout}`);
});

exec(`bunx husky`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the script: ${error.message}`);

    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);

    return;
  }
  console.log('[husky]: init successfully');
});
