import Router from 'koa-router';
import routes from '../routes';
import * as globalController from '../controllers/globalController';
const globalRouter = new Router();

globalRouter.post(routes.register, globalController.register);

globalRouter.post(routes.login, globalController.login);

globalRouter.get(routes.logout, globalController.logout);

export default globalRouter;
