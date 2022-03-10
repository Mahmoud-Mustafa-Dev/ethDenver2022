#EthDenver 2022 init commit

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)


File directory
+ Contracts
    - TokenFactory.sol - initial setup file using OZ wizard
        - includes simplebak contract for wallet deposit/withdraw functions
    - Migrations.sol - standard truffle build file
    - Airdrop.sol - updated airdrop script version with array
+ Gnosis-multisig
  + contracts, migrations, etc included
  
  Reference
  IERC20.sol - Interface of the ERC20 standard as defined in the EIP.
    - IERC20Metadata.sol - extension of interface functionality
    - multiSigWallet.sol - Excerpt sol contract from github. For full Readme refer to
         https://github.com/OpenZeppelin/gnosis-multisig#ethereum-multisignature-wallet

+ Test
   - Truffle test files corresponding to contracts
   - 

