var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {
  var contract;
  var alice = accounts[0];
  var bob   = accounts[1];
  var carol = accounts[2];


  beforeEach(function() {
    return Splitter.new(bob, carol, {from: alice})
    .then(function(instance){
      contract = instance;
    });
  });

  it("should be owned by alice", function() {
    return contract.alice({from: alice})
      .then(function(owner) {
        assert.strictEqual(owner, alice);
      });
  });

  it("should split even amounts", function() {
    var bobBefore   = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);

    return contract.split({ from: alice, value: 100 })
      .then(function(tx) {
        var bobAfter   = web3.eth.getBalance(bob);
        var carolAfter = web3.eth.getBalance(carol);

        assert.equal(bobBefore.plus(50).toNumber(),   bobAfter.toNumber());
        assert.equal(carolBefore.plus(50).toNumber(), carolAfter.toNumber());
      });
  });

  it("should split odd amounts", function() {
    var bobBefore   = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);

    return contract.split({ from: alice, value: 3 })
      .then(function(tx) {
        var bobAfter   = web3.eth.getBalance(bob);
        var carolAfter = web3.eth.getBalance(carol);

        assert.equal(bobBefore.plus(1).toNumber(),   bobAfter.toNumber());
        assert.equal(carolBefore.plus(1).toNumber(), carolAfter.toNumber());
      });
  });

});
