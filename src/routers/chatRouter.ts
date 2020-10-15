import Router from 'koa-router';
import routes from '../routes';
import * as chatController from '../controllers/chatController';
const chatRouter = new Router();

chatRouter.post(routes.startChat, chatController.startChat);

chatRouter.post(routes.leaveChat, chatController.leaveChat);

export default chatRouter;
