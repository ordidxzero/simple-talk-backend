import User from '../models/user';
import { CtxType, AuthRequestBody } from '../@types';

export const register = async (ctx: CtxType): Promise<void> => {
  const { username, password } = <AuthRequestBody>ctx.request.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    const newUser = new User({ username });
    await newUser.setPassword(password);
    await newUser.save();
    ctx.body = { ok: true, message: 'Success to register' };
    return;
  }
  ctx.body = { ok: false, message: 'Username already exist' };
};

export const login = async (ctx: CtxType): Promise<void> => {
  const { username, password } = <AuthRequestBody>ctx.request.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    ctx.body = { ok: false, message: 'Username does not exist' };
    return;
  }
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    ctx.body = { ok: false, message: 'Password is wrong' };
    return;
  }
  const token = user.generateToken();
  ctx.cookies.set('simple_talk_access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  ctx.body = { ok: true, message: 'Success to login' };
};

export const logout = (ctx: CtxType): void => {
  ctx.cookies.set('simple_talk_access_token');
  ctx.status = 204;
};
