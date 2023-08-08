## Scripts

`node test.js`
This script scans the files in the artwork folder and tries to match every one of them to a `mapping.js` entry.

`node prepare.js`
This script copies the files from the `artwork` folder to the `dist` folder, renaming each file according to the part index. The `dist` folder can then be uploaded to IPFS to be used for the NFT artwork (Using e.g. nft.storage)
