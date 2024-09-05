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
Compiled 1 Solidity file successfully (evm target: paris).


  TokenAgentFactory
    Deploy TokenAgentFactory And TokenAgent
        * accounts[0]->TokenAgentFactory.deploy(weth) => 0xDc64a140 - gasUsed: 5403099 0.005403099Ξ 13.51 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[0]->tokenAgentFactory.newTokenAgent() => 0xb0279Db6 - gasUsed: 207530 0.00020753Ξ 0.518825 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[1]->tokenAgentFactory.newTokenAgent() => 0x3dE2Da43 - gasUsed: 190430 0.00019043Ξ 0.476075 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[2]->tokenAgentFactory.newTokenAgent() => 0xddEA3d67 - gasUsed: 190430 0.00019043Ξ 0.476075 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[3]->tokenAgentFactory.newTokenAgent() => 0xAbB60812 - gasUsed: 190430 0.00019043Ξ 0.476075 USD @ 1.0 gwei 2500.00 ETH/USD
        * now: 4:01:31 PM, expiry: 4:03:31 PM
      ✔ Test TokenAgent secondary functions (880ms)
      ✔ Test TokenAgent invalid offers

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974689253866376904                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998900025107057626                    100.0                   1000.0                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998920072184450409                    100.0                   1000.0                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935319020435527                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

        * offers1: ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,1,1,1725516211,100000000000000000,1000000000000000000,200000000000000000,1000000000000000000,300000000000000000,100000000000000000"]
        * accounts[1]->tokenAgents[1].addOffers(offers1) => [0x2eb6...ac33] - gasUsed: 265028 0.000265028Ξ 0.66 USD @ 1.0 gwei 2500.00 ETH/USD
        + tokenAgents[1].Offered20(offerKey:0x2eb6...ac33, maker: 0x70997970, token: 0xe7f1725E, buySell: SELL, expiry: 4:03:31 PM, nonce: 0, prices: ["0.1","0.2","0.3"], tokens: ["1.0","1.0","0.1"], timestamp: 4:03:12 PM)
        * trades1: [["0x2eb6b1864999a78822776fec66a6a0baefcbf06e16c3c0a0bea4b6577726ac33","105000000000000000",1,["1050000000000000000"]]]
        * accounts[2]->tokenAgents[1].trade(trades1) - gasUsed: 133273 0.000133273Ξ 0.33 USD @ 1.0 gwei 2500.00 ETH/USD
        + weth.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokens: 0.11)
        + erc20Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokens: 1.05)
        + tokenAgents[1].Traded20(offerKey:0x2eb6...ac33, taker: 0x3C44CdDd, maker: 0x70997970, token: 0xe7f1725E, makerBuySell: SELL, prices: ["0.1","0.2","0.0"], tokens: ["1.0","0.05","0.0"], averagePrice: 0.104761904761904761, timestamp: 4:03:13 PM)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974689253866376904                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970   9899.99863499671958669                   100.11                   998.95                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd   9899.99878679901346115                    99.89                  1001.05                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935319020435527                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

        * trades2: [["0x2eb6b1864999a78822776fec66a6a0baefcbf06e16c3c0a0bea4b6577726ac33","209523809523809523",1,["1050000000000000000"]]]
        * accounts[2]->tokenAgents[1].trade(trades2) - gasUsed: 143937 0.000143937Ξ 0.36 USD @ 1.0 gwei 2500.00 ETH/USD
        + weth.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokens: 0.22)
        + erc20Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokens: 1.05)
        + tokenAgents[1].Traded20(offerKey:0x2eb6...ac33, taker: 0x3C44CdDd, maker: 0x70997970, token: 0xe7f1725E, makerBuySell: SELL, prices: ["0.0","0.2","0.3"], tokens: ["0.0","0.95","0.1"], averagePrice: 0.209523809523809523, timestamp: 4:03:14 PM)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974689253866376904                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970   9899.99863499671958669                   100.33                    997.9                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998642861851532025                    99.67                   1002.1                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935319020435527                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

      ✔ Test TokenAgent ERC-20 offers and trades (61ms)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974689253866376904                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998900025107057626                    100.0                   1000.0                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998920072184450409                    100.0                   1000.0                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935319020435527                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

        * accounts[1]->tokenAgents[1].addOffers(offers1) => [0xd93d...71a4, 0x5008...b205, 0xa8e1...be05] - gasUsed: 648013 0.000648013Ξ 1.62 USD @ 1.0 gwei 2500.00 ETH/USD
        + tokenAgents[1].Offered721(offerKey:0xd93d...71a4, token: 0x9fE46736, nonce: 0, buySell: BUY, expiry: 4:03:31 PM, count: 4, prices: ["0.1"], tokenIds: [], timestamp: 4:03:12 PM)
        + tokenAgents[1].Offered721(offerKey:0x5008...b205, token: 0x9fE46736, nonce: 0, buySell: SELL, expiry: 4:03:31 PM, count: 4, prices: ["0.1"], tokenIds: ["4","5","6","7"], timestamp: 4:03:12 PM)
        + tokenAgents[1].Offered721(offerKey:0xa8e1...be05, token: 0x9fE46736, nonce: 0, buySell: SELL, expiry: 4:03:31 PM, count: 65535, prices: ["0.1","0.2","0.3","0.4"], tokenIds: ["4","5","6","7"], timestamp: 4:03:12 PM)
        * trades1: [["0x50082e04a3b1b2ee89abb649f620598a85ce7f9befdf2019de339fb46764b205","400000000000000000",1,[4,5,6,7]]]
        * accounts[2]->tokenAgents[1].trade(trades1) - gasUsed: 183584 0.000183584Ξ 0.46 USD @ 1.0 gwei 2500.00 ETH/USD
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 4)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 4)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 5)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 5)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 6)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 6)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 7)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 7)
        + weth.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokens: 0.4)
        + tokenAgents[1].Traded721(offerKey:0x5008...b205, taker: 0x3C44CdDd, maker: 0x70997970, token: 0x9fE46736, makerBuySell: SELL, prices: ["0.1","0.1","0.1","0.1"], tokenIds: ["4","5","6","7"], totalPrice: 0.4, timestamp: 4:03:13 PM)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974689253866376904                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970   9899.99825201115966262                    100.4                   1000.0                                                0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998736487947994217                     99.6                   1000.0           4, 5, 6, 7, 8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935319020435527                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

      ✔ Test TokenAgent ERC-721 offers and trades (43ms)


  4 passing (1s)
```

<br />

<br />

Enjoy!

(c) BokkyPooBah / Bok Consulting Pty Ltd 2024. The MIT Licence.
