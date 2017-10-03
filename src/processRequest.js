import assert from 'assert';
import util from 'ethereumjs-util';

import pin from './pin';
import { put } from './db';

const timeDelay = Infinity; // 1000 * 60; // 1 minute

const allowedAddresses = {
  '0x7ecdc55af01cd035279916c76cad9d9771faf45a': true,
};

function getAddressFromSignature({ signature, ipfsHash, timestamp }) {
  const sanitized = util.addHexPrefix(signature);
  const hash = util.sha3(`${ipfsHash}${timestamp}`);
  const prefix = new Buffer('\x19Ethereum Signed Message:\n');
  const prefixedMsg = util.sha3(Buffer.concat([prefix, new Buffer(String(hash.length)), hash]));
  const { r, s, v } = util.fromRpcSig(sanitized);
  const recovery = util.ecrecover(prefixedMsg, v, r, s);
  const address = util.addHexPrefix(util.publicToAddress(recovery).toString('hex'));
  return address;
}

export default async function processRequest(ctx) {
  const { ipfsHash, timestamp, signature, signer: uppercaseSigner } = ctx.request.body;
  assert.ok(ipfsHash, 'ipfs hash not defined');
  assert.ok(timestamp && new Date(timestamp).getTime() >= new Date().getTime() - timeDelay, 'timestamp invalid');
  const signer = uppercaseSigner.toLowerCase();
  assert.ok(allowedAddresses[signer], 'signer invalid');
  assert.ok(signer === getAddressFromSignature({ ipfsHash, timestamp, signature }), 'passed signer does not match signature');
  await pin(ipfsHash);
  await put(ipfsHash);
  ctx.status = 200;
}
