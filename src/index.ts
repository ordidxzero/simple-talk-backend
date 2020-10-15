import dotenv from 'dotenv';
dotenv.config();
import './db';

import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import socketIO from 'socket.io';
import socketController from './controllers/socketController';
import jwtMiddleware from './lib/middlewares/jwtMiddleware';
import router from './routers';
import socketJwtMiddleware from './lib/middlewares/socketJwtMiddleware';

const app = new Koa();

const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(logger());
app.use(jwtMiddleware);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(PORT, () => console.log(`✅ Listening to port ${PORT}`));

const io = socketIO.listen(server);

io.use(socketJwtMiddleware);

io.on('connection', socketController(io));
