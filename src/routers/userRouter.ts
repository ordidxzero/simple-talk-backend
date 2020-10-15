import Router from 'koa-router';
import routes from '../routes';
import * as userController from '../controllers/userController';
import checkLoggedIn from '../lib/middlewares/checkLoggedIn';
const userRouter = new Router();

userRouter.get(routes.find, userController.find);
userRouter.get(routes.loadFriends, checkLoggedIn, userController.loadFriends);
userRouter.get(routes.loadRooms, checkLoggedIn, userController.loadRooms);
userRouter.post(routes.addFriend, checkLoggedIn, userController.addFriend);
userRouter.post(routes.acceptFriend, checkLoggedIn, userController.acceptFriend);
userRouter.post(routes.removeFriend, checkLoggedIn, userController.removeFriend);

export default userRouter;
