import Router from 'koa-router';
import routes from '../routes';
import * as userController from '../controllers/userController';
const userRouter = new Router();

userRouter.get(routes.user, userController.test);

export default userRouter;
