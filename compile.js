const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const source = fs.readFileSync(inboxPath, "UTF-8");
// module.exports = solc.compile(SourceBuffer, 1).contract(':Inbox');
console.log(JSON.stringify(solc.compile(source, 1).contracts[':Inbox']));
