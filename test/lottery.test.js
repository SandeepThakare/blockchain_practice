import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';
const web3 = new Web3(ganache.provider());
import lotteryData from '../src/lottery.js'
// console.log("lotteryData ====> ", lotteryData);

let lottery;
let accounts;
let contract;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    // contract = web3.eth.Contract(lotteryData.default.interface);

    lottery = await new web3.eth.Contract(JSON.parse(lotteryData.interface)) //Interface is also called as ABI
    .deploy({ data : lotteryData.bytecode })
    .send({
        from: accounts[0],  
        gas: '1000000'
    });
    
    // console.log("Lottery ====> ", lottery);

    // lottery = contract.new({
    //     data: '0x' + lotteryData.default.bytecode,
    //     from: account[0],
    //     gas: '1000000'
    // });
});

describe('Lottery Contract Initialization', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async() => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        // const balance = await lottery.methods.getBalance().call();

        // console.log(balance)

        // console.log(players[0], accounts[0])

        assert.equal(accounts[0], players[0], 'first index of array should be equal');
        assert.equal(1, players.length, 'Its an first entry in index');
    });

    // it('')
});