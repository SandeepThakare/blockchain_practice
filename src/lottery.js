import path from 'path';
import fs from 'fs';
import solc from 'solc';

const lotteryPath = path.resolve(__dirname, '../contracts', 'lottery.sol');
const source = fs.readFileSync(lotteryPath, 'UTF-8');
export default solc.compile(sourceBuffer, 1).contracts[':Lottery'];
// console.log(solc.compile(source, 1).contracts[':Lottery']);