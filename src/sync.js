import { map } from 'awaiting';
import { getAll } from './db';
import pin from './pin';
import log from './log';


export default async function sync() {
  const hashes = Object.keys((await getAll()) || {});
  log(`syncing ${hashes.length} items`);
  await map(hashes, 10, pin);
  log('synced!');
}
