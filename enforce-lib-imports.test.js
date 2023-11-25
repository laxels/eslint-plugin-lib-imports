const { RuleTester } = require("eslint");
const libImportsRule = require("./enforce-lib-imports");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 2015 },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "enforce-lib-imports", // rule name
  libImportsRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: `import asdf from '$lib/foo';`,
        parserOptions: {
          sourceType: "module",
        },
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: `import asdf from './lib/foo';`,
        output: `import asdf from '$lib/foo';`,
        errors: 1,
        parserOptions: {
          sourceType: "module",
        },
      },
      {
        code: `import asdf from '../lib/foo';`,
        output: `import asdf from '$lib/foo';`,
        errors: 1,
        parserOptions: {
          sourceType: "module",
        },
      },
      {
        code: `import asdf from '../../lib/foo';`,
        output: `import asdf from '$lib/foo';`,
        errors: 1,
        parserOptions: {
          sourceType: "module",
        },
      },
      {
        code: `import asdf from '../../../../../lib/foo';`,
        output: `import asdf from '$lib/foo';`,
        errors: 1,
        parserOptions: {
          sourceType: "module",
        },
      },
    ],
  }
);

console.log("All tests passed!");
