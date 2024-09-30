import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const aosCssPath = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'aos',
  'dist',
  'aos.css',
);
const dtsFilePath = path.resolve(__dirname, '..', 'types', 'aos.d.ts');
const aosTypesPath = path.resolve(
  __dirname,
  '..',
  'node_modules',
  '@types',
  'aos',
);

fs.readFile(aosCssPath, 'utf-8', (err, cssData) => {
  if (err) {
    console.error('Error reading AOS CSS file:', err);
    return;
  }

  const animationRegex = /\[data-aos=([a-zA-Z-]+)\]/g;
  let animations = new Set();
  let match;

  while ((match = animationRegex.exec(cssData)) !== null) {
    animations.add(match[1]);
  }

  const animationTypes = Array.from(animations)
    .sort()
    .map((a) => `'${a}'`)
    .join(' | ');

  fs.readFile(
    path.join(aosTypesPath, 'index.d.ts'),
    'utf-8',
    (err, typeData) => {
      if (err) {
        console.error('Error reading aos.d.ts file:', err);
        return;
      }
      const easingRegex = /type easingOptions =\s*([^;]+);/;
      const easingMatch = easingRegex.exec(typeData);
      const easingTypes = easingMatch
        ? easingMatch[1].trim().replace(/\s*\|\s*/g, ' | ')
        : '';

      const anchorPlacementRegex = /type anchorPlacementOptions =\s*([^;]+);/;
      const anchorPlacementMatch = anchorPlacementRegex.exec(typeData);
      const anchorPlacementTypes = anchorPlacementMatch
        ? anchorPlacementMatch[1].trim().replace(/\s*\|\s*/g, ' | ')
        : '';

      const newDts = `
declare namespace JSX {
  interface IntrinsicAttributes {
    'data-aos'?: ${animationTypes};
    'data-aos-offset'?: number;
    'data-aos-delay'?: number;
    'data-aos-duration'?: number;
    'data-aos-easing'?: ${easingTypes};
    'data-aos-mirror'?: boolean;
    'data-aos-once'?: boolean;
    'data-aos-anchor-placement'?: ${anchorPlacementTypes};
  }
}`;

      fs.writeFile(dtsFilePath, newDts, (err) => {
        if (err) {
          console.error('Error writing updated aos.d.ts file:', err);
        } else {
          console.log('[extract aos animations]: types exported successfully');
          exec(
            `bunx prettier --write ${dtsFilePath}`,
            (prettierError, prettierStdout, prettierStderr) => {
              if (prettierError) {
                console.error(
                  `Error running Prettier: ${prettierError.message}`,
                );
                return;
              }

              if (prettierStderr) {
                console.error(`Prettier stderr: ${prettierStderr}`);
                return;
              }

              console.log(`[prettier]: formatted the file: ${prettierStdout}`);
            },
          );
        }
      });
    },
  );
});
