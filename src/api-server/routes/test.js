import Router from 'koa-router';

const router = new Router({ prefix: '/test' });

// /api/v1/test/test
router.get('/test', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'TEST';
});

export default router;
