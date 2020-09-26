import Router from 'koa-router';
import routes from '../routes';
import globalRouter from './globalRouter';
import userRouter from './userRouter';
const router = new Router();

router.use(routes.global, globalRouter.routes());
router.use(routes.user, userRouter.routes());

export default router;
