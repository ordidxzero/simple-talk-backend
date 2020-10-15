import { CtxType, NextType } from '../../@types';
import * as tokenManager from '../tokenManager';

const jwtMiddleware = async (ctx: CtxType, next: NextType): Promise<any> => {
  const token = ctx.cookies.get('simple_talk_access_token');
  if (!token) return next();

  try {
    const decoded = tokenManager.decodeToken(token);
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, username, avatarUrl } = decoded;
      const freshToken = tokenManager.generateToken({ _id, username, avatarUrl });
      ctx.cookies.set('simple_talk_access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    ctx.state.user = decoded;
  } catch (e) {
    ctx.state.user = null;
  }

  return next();
};

export default jwtMiddleware;
