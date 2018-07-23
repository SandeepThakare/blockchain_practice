import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require(../src/lottery.js);

let lottery;
let accounts;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ date:bytecode })
    .send({
        from: accounts[0],
        gas: 1000000
    })
});

describe('Lottery Contract Initialization', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    })
})