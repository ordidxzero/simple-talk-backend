import { CtxType, NextType } from '../../@types';

const checkLoggedIn = (ctx: CtxType, next: NextType): Promise<any> | undefined => {
  const isAuthenticated = ctx.state.user;
  if (!isAuthenticated) {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
