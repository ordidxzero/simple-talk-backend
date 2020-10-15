import Router from 'koa-router';
import routes from '../routes';
import * as globalController from '../controllers/globalController';
const globalRouter = new Router();

globalRouter.post(routes.register, globalController.register);

globalRouter.post(routes.login, globalController.login);

globalRouter.post(routes.logout, globalController.logout);

globalRouter.post(routes.check, globalController.check);

export default globalRouter;
