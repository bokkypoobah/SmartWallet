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

TokenAgentFactory
  Deploy TokenAgentFactory And TokenAgent
      * accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]
      * weth: 0x5FbDB2315678afecb367f032d93F642f64180aa3
      * 20: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512, 721: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0, 1155: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
      > _getTokenType() 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512 1 27594
      > _getTokenType() 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0 2 26688
      > _getTokenType() 0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9 3 28575
      * addOffers1TxReceipt.gasUsed: 279906
      + log: OfferAdded(0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d498,0,1725302541,0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,888,999999999999999999999999999999999999,1725242547)
      + log: OfferAdded(0xb301fb0193f14f9fe200e09d1184245614a8135f22a52a5fcf1fdec9d4ae8e48,0,1725302541,0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0,888,999999999999999999999999999999999998,1725242547)
      + log: OfferAdded(0xa6ae173f07bd2dfc2c34598b906270425ee7a4b3e459412aaf88f809b952359b,1,1725302541,0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9,888,999999999999999999999999999999999997,1725242547)
      * offerKeys: 0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d498,0xb301fb0193f14f9fe200e09d1184245614a8135f22a52a5fcf1fdec9d4ae8e48,0xa6ae173f07bd2dfc2c34598b906270425ee7a4b3e459412aaf88f809b952359b
    ✔ Test TokenAgent offers (607ms)

1 passing (609ms)
```

### Run Test Script

Or run the test with the output saved in [./testIt.out](./testIt.out).

```bash
# chmod 700 ./10_testIt.sh initially
./10_testIt.sh

  TokenAgentFactory
    Deploy TokenAgentFactory And TokenAgent

        * accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]
        * weth: 0x5FbDB2315678afecb367f032d93F642f64180aa3
        * 20: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512, 721: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0, 1155: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
        > _getTokenType() 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512 1 27594
        > _getTokenType() 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0 2 26688
        > _getTokenType() 0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9 3 28575
        * addOffers1TxReceipt.gasUsed: 279906
        + log: OfferAdded(0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d498,0,1725302676,0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,888,999999999999999999999999999999999999,1725242683)
        + log: OfferAdded(0xb301fb0193f14f9fe200e09d1184245614a8135f22a52a5fcf1fdec9d4ae8e48,0,1725302676,0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0,888,999999999999999999999999999999999998,1725242683)
        + log: OfferAdded(0xa6ae173f07bd2dfc2c34598b906270425ee7a4b3e459412aaf88f809b952359b,1,1725302676,0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9,888,999999999999999999999999999999999997,1725242683)
        * offerKeys: 0x8aa9dc1b9e5913098df98f3c9740043e98b0d082fa62837ed4207fd59393d498,0xb301fb0193f14f9fe200e09d1184245614a8135f22a52a5fcf1fdec9d4ae8e48,0xa6ae173f07bd2dfc2c34598b906270425ee7a4b3e459412aaf88f809b952359b
      ✔ Test TokenAgent offers (600ms)


  1 passing (602ms)
```
