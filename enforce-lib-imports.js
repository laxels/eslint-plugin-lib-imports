const RELATIVE_LIB_PATH_REGEX = /^(?:\.\/|(?:\.\.\/)+)lib/;

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      // Performs action in the function on every import declaration
      ImportDeclaration(node) {
        const pathNode = node.source;
        const path = pathNode.value;

        const isRelativeLibImport = RELATIVE_LIB_PATH_REGEX.test(path);
        if (!isRelativeLibImport) {
          return;
        }

        context.report({
          node: pathNode,
          message: `Importing from lib directory using relative path rather than $lib alias`,
          fix(fixer) {
            return fixer.replaceText(
              pathNode,
              `'${path.replace(RELATIVE_LIB_PATH_REGEX, `$lib`)}'`
            );
          },
        });
      },
    };
  },
};
