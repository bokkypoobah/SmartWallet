# Token Agent - Work In Progress

Personal agent for peer-to-peer ERC-20/721/1155 token exchange.

#### How It Works - ERC-20 ATM

* `account1` deploys `TokenAgent1`, cloned via `TokenAgentFactory`
* `account1` approves for `TokenAgent1` to transfer WETH and ERC20
* `account1` adds offers to `TokenAgent1` to, e.g., BUY ERC20: 100 @ 0.1 ERC20/WETH, 200 @ 0.2 ERC20/WETH, ...
* `account2` interacts with `TokenAgent1` to, e.g., SELL ERC20 for WETH against the `account1`'s offers

#### How The Dapp Will Work

* Incrementally scrape all `NewTokenAgent(tokenAgent, owner, index, timestamp)` events emitted by `TokenAgentFactory` to create a list of valid `TokenAgent` addresses
* Incrementally scrape all events emitted by all the deployed `TokenAgent`, filtering by the valid `TokenAgent` addresses
* When a user wants to view the offers and trades for a particular ERC20, incrementally scrape all the ERC20 events
* The dapp will have all the data required to compute the token balances and `TokenAgent` states using the events above

## Testing

#### First Install
Clone/download this repository, and in the new folder on your computer:

```bash
npm install --save-dev hardhat
```

#### Run Test Script

Or run the test with the output saved in [./testIt.out](./testIt.out).
You may initially have to mark the script as executable using the command `chmod 700 ./10_testIt.sh`.

```bash
$ ./10_testIt.sh


  TokenAgentFactory
    Deploy TokenAgentFactory And TokenAgent
        * accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]
        * weth: 0x5FbDB2315678afecb367f032d93F642f64180aa3
        * 20: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512, 721: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0, 1155: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

          # Account                               ETH                     WETH                   ERC-20
          - ---------------- ------------------------ ------------------------ ------------------------
          0 0xf39Fd6e51aad88  9899.979405884141469488                    100.0                   1000.0
          1 0x70997970C51812  9899.999588047250511778                    100.0                   1000.0
          2 0x3C44CdDdB6a900  9899.999835376920678112                    100.0                   1000.0
          3 0x90F79bf6EB2c4f  9899.999838624523415039                    100.0                   1000.0

        * addOffers1TxReceipt.gasUsed: 195427
        + Offer20Added(key:0x2119c1547cc665bfe9, token: 0xe7f1725E77, nonce: 0, info: ["1","1725464386","100000000000000000,1000000000000000000,200000000000000000,1000000000000000000,300000000000000000,100000000000000000"]) @ 9/4/2024, 9:00:09 AM
        * offerKeys: 0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843
        * trades1: [["0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843","2100000000000000000","157142857142857142",1]]
        > ERC-20 price/tokens/used 100000000000000000 1000000000000000000 0
        >        remaining 1000000000000000000
        >        totalTokens/totalWETHTokens 1000000000000000000 100000000000000000
        > ERC-20 price/tokens/used 200000000000000000 1000000000000000000 0
        >        remaining 1000000000000000000
        >        totalTokens/totalWETHTokens 2000000000000000000 300000000000000000
        > ERC-20 price/tokens/used 300000000000000000 100000000000000000 0
        >        remaining 100000000000000000
        >        totalTokens/totalWETHTokens 2100000000000000000 330000000000000000
        >        tokens/totalTokens/totalWETHTokens 2100000000000000000 2100000000000000000 330000000000000000
        >        msg.sender BUY/owner SELL - averagePrice/_trade.averagePrice 157142857142857142 157142857142857142
        * trades1TxReceipt.gasUsed: 190358
        + weth9.Transfer(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,330000000000000000)
        + erc20Token.Transfer(0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,2100000000000000000)
        + Traded(0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843,2100000000000000000,157142857142857142,1,1725404410)

          # Account                               ETH                     WETH                   ERC-20
          - ---------------- ------------------------ ------------------------ ------------------------
          0 0xf39Fd6e51aad88  9899.979405884141469488                    100.0                   1000.0
          1 0x70997970C51812   9899.99938235301935173                   100.33                    997.9
          2 0x3C44CdDdB6a900  9899.999636251829369206                    99.67                   1002.1
          3 0x90F79bf6EB2c4f  9899.999838624523415039                    100.0                   1000.0

      ✔ Test TokenAgent offers (599ms)


  1 passing (601ms)
```
