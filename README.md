# ConsenSys Academy Splitter


## You will create a smart contract named Splitter whereby

- There are 3 people: Alice, Bob and Carol
- We can see the balance of the Splitter contract on the web page
- Whenever Alice sends ether to the contract, half of it goes to Bob and the other half to Carol
- We can see the balances of Alice, Bob and Carol on the web page
- We can send ether to it from the web page
- It would be even better if you could team up with different people impersonating Alice, Bob and Carol, all cooperating on a test net.


## Stretch goals

- Add a kill switch to the whole contract
- Make the contract a utility that can be used by David, Emma and anybody with an address
- Cover potentially bad input data


## Review

### Low difficulty

- Did you check the bool return value of address.send()?
- Did you throw when it fails?
- Did you create methods to get balance, when the facility is already there?

### Medium difficulty

- Did you pass proper beneficiary addresses as part of the constructor? Instead of using a setter afterwards.
- Did you check for empty addresses?
- Did you split msg.value and forgot that odd values may leave 1 wei in the contract balance?
- Did you cover the fallback function?
- Did you provide a kill switch?

### High difficulty

- Did you send (a.k.a. push) the funds instead of letting the beneficiaries withdraw (a.k.a. pull) the funds?
- If you pushed the funds, did you cover a potential reentrance?
