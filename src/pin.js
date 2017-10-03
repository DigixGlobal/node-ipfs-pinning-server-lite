import ipfsAPI from 'ipfs-api';
import log from './log';

const ipfs = ipfsAPI();

export default async function pin(ipfsHash) {
  await ipfs.pin.add(ipfsHash);
  log('pinned', ipfsHash);
}
