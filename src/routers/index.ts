import Router from 'koa-router';
import routes from '../routes';
import chatRouter from './chatRouter';
import userRouter from './userRouter';
import globalRouter from './globalRouter';
const router = new Router();

router.use(routes.global, globalRouter.routes());
router.use(routes.user, userRouter.routes());
router.use(routes.chat, chatRouter.routes());

export default router;
