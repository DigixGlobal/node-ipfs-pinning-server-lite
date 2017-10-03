import Koa from 'koa';
import koaBody from 'koa-body';

import log from './log';
import processRequest from './processRequest';

export default function initilize() {
  const app = new Koa();
  app.use(koaBody());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      log('ERR:', err.message);
    }
  });

  app.use(async (ctx, next) => {
    log('request from', ctx.ip, ctx.method, JSON.stringify(ctx.request.body || ctx.query));
    if (ctx.method !== 'POST') {
      ctx.throw(500, 'bad request');
    }
    await processRequest(ctx);
    await next();
  });

  app.listen(3000);

  log('listening on port 3000');
}
