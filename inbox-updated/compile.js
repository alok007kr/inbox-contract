const fs = require('fs')
const path = require('path')
const solc = require('solc')


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath,'utf8')

const input = {
    language : 'Solidity',
    sources : {
        'Inbox.sol': {
            content : source,
        },
    },

    settings : {
        outputSelection : {
            '*' : {
                '*' : ['*']
            },
        },
    },
};

 
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts)

module.exports = JSON.parse(solc.compile(JSON.stringify(input)))
.contracts[
    'Inbox.sol'
].Inbox;

