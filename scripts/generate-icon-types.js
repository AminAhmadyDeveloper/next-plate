import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const styleCssPath = path.resolve(
  __dirname,
  '..',
  'node_modules',
  '@phosphor-icons',
  'web',
  'src',
  'regular',
  'style.css',
);
const outputDtsPath = path.resolve(
  __dirname,
  '..',
  'types',
  'phosphor-icons.d.ts',
);
const dtsFilePath = path.resolve(
  __dirname,
  '..',
  'types',
  'phosphor-icons.d.ts',
);

fs.readFile(styleCssPath, 'utf-8', (err, cssData) => {
  if (err) {
    console.error('Error reading style.css file:', err);
    return;
  }

  const iconRegex =
    /\.ph\.(\w[\w-]*):before\s*{\s*content:\s*"\\([^"]+)";\s*}/g;
  const icons = {};
  let match;

  while ((match = iconRegex.exec(cssData)) !== null) {
    const iconName = match[1];
    const iconUnicode = `\\${match[2]}`;
    icons[iconName] = iconUnicode;
  }

  const iconTypes = Object.keys(icons)
    .map((icon) => `  | "${icon}"`)
    .join('\n');

  const outputDts = `declare global {
type Phosphor =${iconTypes};
}

export {};
`;

  fs.writeFile(outputDtsPath, outputDts, (err) => {
    if (err) {
      console.error('Error writing phosphor-icons.d.ts file:', err);
    } else {
      console.log('[phosphor icons]: created successfully with icon types.');
      exec(
        `bunx prettier --write ${dtsFilePath}`,
        (prettierError, prettierStdout, prettierStderr) => {
          if (prettierError) {
            console.error(`Error running Prettier: ${prettierError.message}`);
            return;
          }

          if (prettierStderr) {
            console.error(`Prettier stderr: ${prettierStderr}`);
            return;
          }

          console.log(`[prettier] formatted the file: ${prettierStdout}`);
        },
      );
    }
  });
});
