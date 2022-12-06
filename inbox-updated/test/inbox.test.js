const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

let accounts;
let inbox;

beforeEach(async ()=>{
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
  .deploy({data:evm.bytecode.object,arguments:["Hello World!"]})
  .send({from:accounts[0],gas:"1000000"});
});



describe("Inbox",()=>{
  it("deployes a contract",()=>{
 assert.ok(inbox.options.address);
    });

    it("has initial message",async ()=>{
      const message = await inbox.methods.message().call();
      assert.equal(message,"Hello World!");
    });


    it("can set new message",async ()=>{
      await inbox.methods.setMessage("Byee").send({from:accounts[0]});
      const message = await inbox.methods.message().call();
      assert.equal(message,"Byee");
    });

});