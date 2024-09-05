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
        * accounts[0]->TokenAgentFactory.deploy(weth) => 0xDc64a140 - gasUsed: 5255065 0.005255065Ξ 13.14 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[0]->tokenAgentFactory.newTokenAgent() => 0xb0279Db6 - gasUsed: 207530 0.00020753Ξ 0.518825 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[1]->tokenAgentFactory.newTokenAgent() => 0x3dE2Da43 - gasUsed: 190430 0.00019043Ξ 0.476075 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[2]->tokenAgentFactory.newTokenAgent() => 0xddEA3d67 - gasUsed: 190430 0.00019043Ξ 0.476075 USD @ 1.0 gwei 2500.00 ETH/USD
        * accounts[3]->tokenAgentFactory.newTokenAgent() => 0xAbB60812 - gasUsed: 190430 0.00019043Ξ 0.476075 USD @ 1.0 gwei 2500.00 ETH/USD
        * now: 12:18:01 PM, expiry: 12:20:01 PM
      ✔ Test TokenAgent secondary functions (801ms)
      ✔ Test TokenAgent invalid offers

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974919727686525205                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998900181576668113                    100.0                   1000.0                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998920201773475504                    100.0                   1000.0                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935428165605573                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

        * offers1: ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,1,1,1725502801,100000000000000000,1000000000000000000,200000000000000000,1000000000000000000,300000000000000000,100000000000000000"]
        * accounts[1]->tokenAgents[1].addOffers(offers1) => ["0xcde69e1c"] - gasUsed: 266509 0.000266509Ξ 0.67 USD @ 1.0 gwei 2500.00 ETH/USD
        + tokenAgents[1].Offer20Added(offerKey:0xcde6...4883, token: 0xe7f1725E, nonce: 0, buySell: SELL, expiry: 12:20:01 PM, prices: ["0.1","0.2","0.3"], tokens: ["1.0","1.0","0.1"], timestamp: 12:19:42 PM)
        * trades1: [["0xcde69e1c909108e2298254c1f970de54bc3f11e6cb7e7a512a1053a5f3604883","105000000000000000",1,["1050000000000000000"]]]
        > ERC-20 price/tokens/used 100000000000000000 1000000000000000000 0
        >        remaining 1000000000000000000
        >        totalTokens/totalWETHTokens 1000000000000000000 100000000000000000
        > ERC-20 price/tokens/used 200000000000000000 1000000000000000000 0
        >        remaining 1000000000000000000
        >        totalTokens/totalWETHTokens 1050000000000000000 110000000000000000
        >        tokens/totalTokens/totalWETHTokens 1050000000000000000 1050000000000000000 110000000000000000
        >        msg.sender BUY/owner SELL - averagePrice/_trade.price 104761904761904761 105000000000000000
        * accounts[2]->tokenAgents[1].trade(trades1) - gasUsed: 142453 0.000142453Ξ 0.36 USD @ 1.0 gwei 2500.00 ETH/USD
        + weth.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokens: 0.11)
        + erc20Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokens: 1.05)
        + tokenAgents[1].Traded(0xcde69e1c909108e2298254c1f970de54bc3f11e6cb7e7a512a1053a5f3604883,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,1050000000000000000,105000000000000000,1,1725502783)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974919727686525205                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998633672187031955                   100.11                   998.95                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998777748590708305                    99.89                  1001.05                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935428165605573                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

        * trades2: [["0xcde69e1c909108e2298254c1f970de54bc3f11e6cb7e7a512a1053a5f3604883","209523809523809523",1,["1050000000000000000"]]]
        > ERC-20 price/tokens/used 100000000000000000 1000000000000000000 1000000000000000000
        >        remaining 0
        >        totalTokens/totalWETHTokens 0 0
        > ERC-20 price/tokens/used 200000000000000000 1000000000000000000 50000000000000000
        >        remaining 950000000000000000
        >        totalTokens/totalWETHTokens 950000000000000000 190000000000000000
        > ERC-20 price/tokens/used 300000000000000000 100000000000000000 0
        >        remaining 100000000000000000
        >        totalTokens/totalWETHTokens 1050000000000000000 220000000000000000
        >        tokens/totalTokens/totalWETHTokens 1050000000000000000 1050000000000000000 220000000000000000
        >        msg.sender BUY/owner SELL - averagePrice/_trade.price 209523809523809523 209523809523809523
        * accounts[2]->tokenAgents[1].trade(trades2) - gasUsed: 157876 0.000157876Ξ 0.39 USD @ 1.0 gwei 2500.00 ETH/USD
        + weth.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokens: 0.22)
        + erc20Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokens: 1.05)
        + tokenAgents[1].Traded(0xcde69e1c909108e2298254c1f970de54bc3f11e6cb7e7a512a1053a5f3604883,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,1050000000000000000,209523809523809523,1,1725502784)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974919727686525205                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998633672187031955                   100.33                    997.9                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998619872413097805                    99.67                   1002.1                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935428165605573                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

      ✔ Test TokenAgent ERC-20 offers and trades (61ms)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974919727686525205                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998900181576668113                    100.0                   1000.0                         4, 5, 6, 7             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998920201773475504                    100.0                   1000.0                       8, 9, 10, 11             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935428165605573                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

        * accounts[1]->tokenAgents[1].addOffers(offers1) - gasUsed: 620448 0.000620448Ξ 1.55 USD @ 1.0 gwei 2500.00 ETH/USD
        + tokenAgents[1].Offer721Added(offerKey:0xb4ce...bd44, token: 0x9fE46736, nonce: 0, buySell: BUY, expiry: 12:20:01 PM, count: 5, prices: ["0.1"], tokenIds: [], timestamp: 12:19:42 PM)
        + tokenAgents[1].Offer721Added(offerKey:0xcaff...4315, token: 0x9fE46736, nonce: 0, buySell: SELL, expiry: 12:20:01 PM, count: 6, prices: ["0.1"], tokenIds: ["4","5","6","7"], timestamp: 12:19:42 PM)
        + tokenAgents[1].Offer721Added(offerKey:0x3ba7...5a95, token: 0x9fE46736, nonce: 0, buySell: SELL, expiry: 12:20:01 PM, count: 65535, prices: ["0.1","0.2","0.3"], tokenIds: ["1","2","3"], timestamp: 12:19:42 PM)
        * offerKeys: 0xb4ce55ea48da7db788ab81391c56e18c511a10f0df073038279495402992bd44,0xcaffa898c8c33342b694be47c0bf44f80d8351cf9f960ee6257bf4856a5a4315,0x3ba70158f2bcaa81f2c123ee30296e29d30ca83b04c0a1088aae519e10455a95
        * trades1: [["0xb4ce55ea48da7db788ab81391c56e18c511a10f0df073038279495402992bd44","157142857142857142",1,[8,9,10,11]],["0xcaffa898c8c33342b694be47c0bf44f80d8351cf9f960ee6257bf4856a5a4315","157142857142857142",1,[4,5,6,7]]]
        >        msg.sender SELL/owner BUY tokenId 8
        >        msg.sender SELL/owner BUY tokenId 9
        >        msg.sender SELL/owner BUY tokenId 10
        >        msg.sender SELL/owner BUY tokenId 11
        >        msg.sender BUY/owner SELL tokenId 4
        >        msg.sender BUY/owner SELL tokenId 5
        >        msg.sender BUY/owner SELL tokenId 6
        >        msg.sender BUY/owner SELL tokenId 7
        * accounts[2]->tokenAgents[1].trade(trades1) - gasUsed: 230676 0.000230676Ξ 0.58 USD @ 1.0 gwei 2500.00 ETH/USD
        + erc721Token.Approval(from: 0x3C44CdDd, to: 0x00000000, tokenId: 8)
        + erc721Token.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokenId: 8)
        + erc721Token.Approval(from: 0x3C44CdDd, to: 0x00000000, tokenId: 9)
        + erc721Token.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokenId: 9)
        + erc721Token.Approval(from: 0x3C44CdDd, to: 0x00000000, tokenId: 10)
        + erc721Token.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokenId: 10)
        + erc721Token.Approval(from: 0x3C44CdDd, to: 0x00000000, tokenId: 11)
        + erc721Token.Transfer(from: 0x3C44CdDd, to: 0x70997970, tokenId: 11)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 4)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 4)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 5)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 5)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 6)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 6)
        + erc721Token.Approval(from: 0x70997970, to: 0x00000000, tokenId: 7)
        + erc721Token.Transfer(from: 0x70997970, to: 0x3C44CdDd, tokenId: 7)

          # Account                         ETH          WETH 0x5FbDB231        ERC-20 0xe7f1725E                 ERC-721 0x9fE46736                ERC-1155 0xCf7Ed3Ac
          - ---------- ------------------------ ------------------------ ------------------------ ---------------------------------- ----------------------------------
          0 0xf39Fd6e5  9899.974919727686525205                    100.0                   1000.0                         0, 1, 2, 3             0:10, 1:10, 2:10, 3:10
          1 0x70997970  9899.998279732669573137                    100.0                   1000.0                       8, 9, 10, 11             0:20, 1:20, 2:20, 3:20
          2 0x3C44CdDd  9899.998689525476595492                    100.0                   1000.0                         4, 5, 6, 7             0:30, 1:30, 2:30, 3:30
          3 0x90F79bf6  9899.998935428165605573                    100.0                   1000.0                     12, 13, 14, 15             0:40, 1:40, 2:40, 3:40

      ✔ Test TokenAgent ERC-721 offers and trades (43ms)


  4 passing (924ms)
```

<br />

<br />

Enjoy!

(c) BokkyPooBah / Bok Consulting Pty Ltd 2024. The MIT Licence.
