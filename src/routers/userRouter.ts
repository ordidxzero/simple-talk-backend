import Router from 'koa-router';
import routes from '../routes';
import * as userController from '../controllers/userController';
const userRouter = new Router();

userRouter.get(routes.loadFriends, userController.loadFriends);
userRouter.get(routes.find, userController.find);
userRouter.get(routes.addFriend(), userController.addFriend);
userRouter.get(routes.removeFriend(), userController.removeFriend);

export default userRouter;
