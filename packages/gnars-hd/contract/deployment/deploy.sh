source .env && forge create --rpc-url ${MAINNET_RPC_URL} \
    --constructor-args-path deployment/constructor_args \
    --private-key ${DEPLOYER_PRIVATE_KEY} \
    --etherscan-api-key ${ETHERSCAN_API_KEY} \
    --verify \
    src/GnarsHD.sol:GnarsHD