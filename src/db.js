import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

const adapter = new FileAsync('db.json');

let db;

export async function initialize() {
  db = await low(adapter);
  await db.defaults({ hashes: {} }).write();
}

export async function getAll() {
  return db.get('hashes').value();
}
export async function get(ipfsHash) {
  return db.get(`hashes.${ipfsHash}`);
}
export async function put(ipfsHash) {
  await db.set(`hashes.${ipfsHash}`, new Date()).write();
}
