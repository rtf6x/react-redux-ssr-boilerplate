import Router from 'koa-router';
import test from './test';

const router = new Router({ prefix: '/api/v1' });

router.use(test.routes());

export default router;
