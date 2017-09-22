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

  it('should be owned by alice', function() {
    return contract.alice({from: alice})
      .then(function(owner) {
        assert.strictEqual(owner, alice);
      });
  });

  it('should split even amounts', function() {
    return contract.split(bob, carol, { from: alice, value: 100 })
      .then(function(tx) {
        contract.getBalance(alice).then(function(balance){
          assert.equal('0', balance);
        });

        contract.getBalance(bob).then(function(balance){
          assert.equal('50', balance);
        });

        contract.getBalance(carol).then(function(balance){
          assert.equal('50', balance);
        });
      });
  });

  it('should split odd amounts', function() {
    return contract.split(bob, carol, { from: alice, value: 101 })
      .then(function(tx) {
        contract.getBalance(alice).then(function(balance){
          assert.equal('1', balance);
        });

        contract.getBalance(bob).then(function(balance){
          assert.equal('50', balance);
        });

        contract.getBalance(carol).then(function(balance){
          assert.equal('50', balance);
        });
      });
  });

  it('should be able to withdraw', function() {
    var bobBefore = web3.eth.getBalance(bob);
    var transactionPrice = 0;

    return contract.split(bob, carol, { from: alice, value: 100, gasPrice: 1 })
      .then(function(tx) {
        return contract.withdraw({ from: bob, gasPrice: 1 })
      })
      .then(function(tx) {
        transactionPrice = tx.receipt.gasUsed;

        bobAfter = web3.eth.getBalance(bob);

        assert.equal(bobBefore.minus(transactionPrice).plus(50).toString(), bobAfter.toString());
      });
  });
});
