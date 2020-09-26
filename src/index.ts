import dotenv from 'dotenv';
dotenv.config();
import './db';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routers';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

const app = new Koa();

const PORT = process.env.PORT || 4000;

app.use(jwtMiddleware);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`✅ Listening to port ${PORT}`));
