### To generate image
  <code>Convert change "module": "esnext" to "module": "CommonJS" in tsconfig.ts</code>
  - This is why ts-node does not support *.ts, only support *.js

### How to deply on main net
1. Deploy smart contract on main net
  - deploy seeder contract and get address
  - deploy description contract and get address
    <code>
      1. add arts binary data
    </code>
  - deploy skate contract and get address
    <code>
      1. Deploy with seeder, descriptor address and reserved price, reserved price.
      2. set skate and Dao address
    </code>

*** You can follow video to deploy ***
2. Change client source code for main net.
  - change .env with contract and all information you need
  <code>
    REACT_APP_API_URL = "change from alchemy rinkeby testnet key to alchemy mainnet key"
    PRIVATE_KEY = "owner private key"
    REACT_APP_PUBLIC_KEY = "owner public key"
    REACT_APP_SEEDER_ADDRESS = "seeder address"
    REACT_APP_DESCRIPTOR_ADDRESS = "descriptor address"
    REACT_APP_SKATE_ADDRESS = "skate address"
    REACT_APP_TIMER_TICK = 7000
  </code>
  - change abi code in src/abi folder
  - change rinkeby testnet test to main net
   <code>
    1. /src/components/contents/auction/bidwallet.js
      change from "if (chainId !== 4) {
      addToast("Please switch your network to Ethereum Rinkeby Testnet", {
        appearance: 'error',
        autoDismiss: true,
      })
      return;
    }" to "if (chainId !== 1) {
      addToast("Please switch your network to Ethereum Mainnet", {
        appearance: 'error',
        autoDismiss: true,
      })
      return;
    }"
   </code>