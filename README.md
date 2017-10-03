# IPFS Pinner (Lite)

* Http endpoint for pinning requests
* Auth via ECRecover
* Pins to IPFS locally
* Persistence layer that resyncs pins on startup

**Start the Server**

```bash
npm run daemon; # stop with daemon:stop
```

**Sign the Message**

```javascript
const message = '0x' + sha3(`${ipfsHash}${timestamp}`);
const signature = web3.eth.sign(address, message);
```

**Make a Request**

```
curl --data '{"signer":"0x7ecdc55af01cd035279916c76cad9d9771faf45a","ipfsHash":"Qmdesg3spx73zDUjCfo7sknkvJAWPQdVJdq9TXZT3NWTKr","timestamp":1507020732279,"signature":"0x64c19d212f41ab5e96039ac1d53f12258bdbd578af2dc376fe4e6c0f4e9f53b135aa07ead606ac0a04ca752e987f4f7cd298d649edceab8dad1d564572419ee601"}' -H "Content-Type: application/json" -X POST http://localhost:3000
```
