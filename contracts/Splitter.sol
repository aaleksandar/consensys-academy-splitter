pragma solidity ^0.4.14;

contract Splitter {
  address public alice;
  address public bob;
  address public carol;

  mapping (address => uint) public balances;

  function Splitter(address _bob, address _carol) {
    alice = msg.sender;
    bob = _bob;
    carol = _carol;
  }

  function split() payable returns(bool success) {
    require(msg.sender == alice);
    require(msg.value > 0);

    uint half = msg.value / 2;

    bob.transfer(half);
    carol.transfer(half);

    if (msg.value % 2 == 1) {
      alice.transfer(1);
    }

    return true;
  }

  function kill() {
    require(msg.sender == alice);

    selfdestruct(alice);
  }
}

