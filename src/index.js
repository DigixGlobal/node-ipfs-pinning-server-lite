import { initialize } from './db';
import sync from './sync';
import server from './server';

(async () => {
  await initialize();
  await sync();
  server();
})();

// create a server
// have an endpoint for post requests
// manage the request
// wait for the file to be pinned
// add the hash to the pin list
// respond to the
