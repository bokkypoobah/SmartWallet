# Token Agent - Work In Progress

Personal agent for peer-to-peer ERC-20/721/1155 token exchange.

## Testing

### First Install
Clone/download this repository, and in the new folder on your computer:

```bash
npm install --save-dev hardhat
```

### Run test
```bash
npx hardhat test

Compiled 1 Solidity file successfully (evm target: paris).


  TokenAgentFactory
    Deploy TokenAgentFactory And TokenAgent
        * accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]
        * weth: 0x5FbDB2315678afecb367f032d93F642f64180aa3
        * 20: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512, 721: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0, 1155: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

          # Account                               ETH                     WETH                   ERC-20
          - ---------------- ------------------------ ------------------------ ------------------------
          0 0xf39Fd6e51aad88  9899.980005791264739344                    100.0                  10000.0
          1 0x70997970C51812  9899.999588280172286821                    100.0                  10000.0
          2 0x3C44CdDdB6a900  9899.999835469118505823                    100.0                  10000.0
          3 0x90F79bf6EB2c4f  9899.999838705231514918                    100.0                  10000.0

        > ERC-20 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
        > ERC-20 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
        * addOffers1TxReceipt.gasUsed: 215371
        + OfferAdded(0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d492,0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,0,1725372294,123450000000000000,1000100000000000000000,1725312316)
        + OfferAdded(0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843,0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,1,1725372294,234560000000000000,100200000000000000000,1725312316)
        * offerKeys: 0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d492,0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843
        * trades1: [["0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d492","10000000000000000000"]]
        > ERC-20 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512 0 10000000000000000000
        > Tokens, Remaining 1000100000000000000000 1000100000000000000000
        > Price 123450000000000000
        > wethTokens 1234500000000000000
        * trade1TxReceipt.gasUsed: 92580

          # Account                               ETH                     WETH                   ERC-20
          - ---------------- ------------------------ ------------------------ ------------------------
          0 0xf39Fd6e51aad88  9899.980005791264739344                    100.0                  10000.0
          1 0x70997970C51812   9899.99936163416424269                  98.7655                  10010.0
          2 0x3C44CdDdB6a900  9899.999738639550692323                 101.2345                   9990.0
          3 0x90F79bf6EB2c4f  9899.999838705231514918                    100.0                  10000.0

      ✔ Test TokenAgent offers (621ms)


  1 passing (622ms)
```

### Run Test Script

Or run the test with the output saved in [./testIt.out](./testIt.out).
You may initially have to mark the script as executable using the command `chmod 700 ./10_testIt.sh`.

```bash
$ ./10_testIt.sh
Compiled 1 Solidity file successfully (evm target: paris).


  TokenAgentFactory
    Deploy TokenAgentFactory And TokenAgent
        * accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]
        * weth: 0x5FbDB2315678afecb367f032d93F642f64180aa3
        * 20: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512, 721: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0, 1155: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

          # Account                               ETH                     WETH                   ERC-20
          - ---------------- ------------------------ ------------------------ ------------------------
          0 0xf39Fd6e51aad88  9899.980005791264739344                    100.0                  10000.0
          1 0x70997970C51812  9899.999588280172286821                    100.0                  10000.0
          2 0x3C44CdDdB6a900  9899.999835469118505823                    100.0                  10000.0
          3 0x90F79bf6EB2c4f  9899.999838705231514918                    100.0                  10000.0

        > ERC-20 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
        > ERC-20 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
        * addOffers1TxReceipt.gasUsed: 215371
        + OfferAdded(0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d492,0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,0,1725372294,123450000000000000,1000100000000000000000,1725312316)
        + OfferAdded(0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843,0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,1,1725372294,234560000000000000,100200000000000000000,1725312316)
        * offerKeys: 0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d492,0x2119c1547cc665bfe99ddf627a536c54f5c6e15869dc263b03aa27d3c4f20843
        * trades1: [["0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d492","10000000000000000000"]]
        > ERC-20 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512 0 10000000000000000000
        > Tokens, Remaining 1000100000000000000000 1000100000000000000000
        > Price 123450000000000000
        > wethTokens 1234500000000000000
        * trade1TxReceipt.gasUsed: 92580

          # Account                               ETH                     WETH                   ERC-20
          - ---------------- ------------------------ ------------------------ ------------------------
          0 0xf39Fd6e51aad88  9899.980005791264739344                    100.0                  10000.0
          1 0x70997970C51812   9899.99936163416424269                  98.7655                  10010.0
          2 0x3C44CdDdB6a900  9899.999738639550692323                 101.2345                   9990.0
          3 0x90F79bf6EB2c4f  9899.999838705231514918                    100.0                  10000.0

      ✔ Test TokenAgent offers (621ms)


  1 passing (622ms)
```
