const libImportsRule = require("./enforce-lib-imports");
const plugin = { rules: { "enforce-lib-imports": libImportsRule } };
module.exports = plugin;
