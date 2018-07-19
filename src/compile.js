import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve(__dirname, "../contracts", "inbox.sol");
const source = fs.readFileSync(inboxPath, "UTF-8");
export default solc.compile(SourceBuffer, 1).contract(':Inbox');
// console.log(JSON.stringify(solc.compile(source, 1).contracts[':Inbox']));
