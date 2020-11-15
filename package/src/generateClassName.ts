import { GenerateId } from 'jss';
/* eslint-disable no-console */

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// Copied from material-ui due to issue https://github.com/callemall/material-ui/issues/8223

// This counter is moved outside from `generateClassName` to solve the issue
let ruleCounter = 0;

// Adds a prefix to all generated class names, to avoid conflict with other Material UI instances.
const prefix = 'materialui-daterange-picker';

const generateClassName: GenerateId = (rule, sheet) => {
  ruleCounter += 1;

  if (ruleCounter > 1e10) {
    console.warn(
      [
        'Material-UI: you might have a memory leak.',
        'The ruleCounter is not supposed to grow that much.',
      ].join('')
    );
  }

  if (sheet && sheet.options.meta) {
    return `${prefix}-${sheet.options.meta}-${rule.key}-${ruleCounter}`;
  }

  return `${prefix}-${rule.key}-${ruleCounter}`;
};

export default generateClassName;
