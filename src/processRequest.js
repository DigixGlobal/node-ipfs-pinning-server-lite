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
  const { r, s, v } = util.fromRpcSig(sanitized);
  const message = util.hashPersonalMessage(util.sha3(`${ipfsHash}${timestamp}`));
  const recovery = util.ecrecover(message, v, r, s);
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
