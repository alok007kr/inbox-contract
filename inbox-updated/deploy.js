const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const {abi,evm} = require('./compile.js')

const provider = new HDWalletProvider(
    'YOUR_NEMONIC',
    'YOUR INFURA URL'
)

const web3 = new Web3(provider)

let accounts;

const deploy = async() => {
    //Getting all the accounts
    accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploying', accounts[0])

    // deploying process
    const result = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: ["Hello world"]})
    .send({from: accounts[0], gas: 1000000})

    console.log("Deployed to ", result.options.address)
    provider.engine.stop()
}

deploy();