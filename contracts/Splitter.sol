pragma solidity ^0.4.14;

contract Splitter {
  address public alice;

  mapping (address => uint) public balances;

  event LogSplit(address _alice, address _bob, address _carol, uint amount);
  event LogWithdraw(address withdrawer, uint amount);

  function Splitter() {
    alice = msg.sender;
  }


  function split(address bob, address carol)
    payable
    returns(bool success)
  {
    require(msg.value > 0);

    uint half = msg.value / 2;

    balances[bob]   += half;
    balances[carol] += half;

    if (msg.value % 2 == 1) {
      balances[msg.sender] += 1;
    }

    LogSplit(alice, bob, carol, msg.value);
    return true;
  }


  function withdraw()
    returns(bool success)
  {
    require(balances[msg.sender] > 0);

    uint amount = balances[msg.sender];
    balances[msg.sender] = 0;

    msg.sender.transfer(amount);

    LogWithdraw(msg.sender, amount);
    return true;
  }


  function getBalance(address adr)
    constant
    returns(uint)
  {
    return balances[adr];
  }


  function kill() {
    require(msg.sender == alice);

    selfdestruct(alice);
  }
}

