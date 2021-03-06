import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import Contract from './lottery';

// console.log('Bytecode -- ', Contract.bytecode);
console.log('Interface -- ', Contract.interface);

const provider = new HDWalletProvider(
    'polar online naive six govern width deliver negative common prison vapor orbit',//nounce
    'https://rinkeby.infura.io/v3/b3484496ff3649649ab8c9e431af53c0'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts);

    const result = await new web3.eth.Contract(JSON.parse(Contract.interface))
        .deploy({ data: '0x' + Contract.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log(result.options.address);

};
deploy();