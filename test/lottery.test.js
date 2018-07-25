import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';
const web3 = new Web3(ganache.provider());
import lotteryData from '../src/lottery.js'
// console.log("lotteryData ====> ", lotteryData);

let lottery;
let accounts;
let contract;
let players;

before(async() => {
    accounts = await web3.eth.getAccounts();

    // contract = web3.eth.Contract(lotteryData.default.interface);

    lottery = await new web3.eth.Contract(JSON.parse(lotteryData.interface)) //Interface is also called as ABI
    .deploy({ data : lotteryData.bytecode })
    .send({
        from: accounts[0],  
        gas: '1000000'
    });
    // console.log('run');
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

    it('allow multiple accounts to enter in lottery', async() => {

        for (let index = 0; index < 4; index++) {
            await lottery.methods.enter().send({
                from: accounts[index],
                value: web3.utils.toWei('10', 'ether')
            });

            players = await lottery.methods.getPlayers().call({
                from: accounts[0]
            });

            // Here players[index+1] - because we use before instead of beforeEach
            // which is executed only once for every describe 
            // so aur players array is not reinitialize for every test case
            assert.equal(accounts[index], players[index+1], `address in array index - ${index} should be equal`);
        }
        assert.equal(5, players.length, 'length of players array should be 5');
        const balance = await lottery.methods.getBalance().call();
        console.log(balance);
    });

    it('require minimum amount of ether to enter', async() => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });

            players = await lottery.methods.getPlayers().call({
                from: accounts[0]
            });

            assert.equal(5, players.length, 'Should not add address in array');
            assert.equal(false);
        }
        catch (err) {
            players = await lottery.methods.getPlayers().call({
                from: accounts[0]
            });
            console.log('Array length - ', players.length);
            assert(err);
        }
    });

    it('Only manager can pick the winner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        }
        catch(err) {
            // console.log(err);
            assert(err, null);
        }
    });

    it('pick winner and reset array', async() => {

        players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        const initialBalance = await lottery.methods.getBalance().call();
        console.log('Initial Balance - ', initialBalance);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await lottery.methods.getBalance().call();
        console.log('Final Balance - ', finalBalance);

        for (let index = 0; index < players.length - 1; index++) {
            console.log(`Player ${index} - ${players[index]} : ${JSON.stringify( await web3.eth.getBalance(accounts[index]))}`);
        }

        assert(finalBalance == 0);

    });
});