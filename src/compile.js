import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve(__dirname, "../contracts", "testLottery.sol");
const source = fs.readFileSync(inboxPath, "UTF-8");
export default solc.compile(source, 1).contracts[':Inbox'];
// console.log(JSON.stringify(solc.compile(source, 1).contracts[':mypool'].interface));
// console.log(solc.compile(source, 1).contracts[':mypool'].interface)
