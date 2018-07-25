import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';
const web3 = new Web3(ganache.provider());

const lotteryData = require('../src/lottery.js');
console.log("lotteryData ====> ", lotteryData);
let lottery;
let accounts;
let contract;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    // contract = web3.eth.Contract(lotteryData.default.interface);

    lottery = await new web3.eth.Contract(JSON.parse(lotteryData.default.interface)) //Interface is also called as ABI
    .deploy({ date : lotteryData.default.bytecode })
    .send({
        from: accounts[0],  
        gas: '1000000'
    });

    // lottery = contract.new({
    //     data: '0x' + lotteryData.default.bytecode,
    //     from: account[0],
    //     gas: '1000000'
    // });
});

console.log("Lottery ====> ", lottery);

describe('Lottery Contract Initialization', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });
});