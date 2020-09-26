import { CtxType } from '../@types';

export const test = (ctx: CtxType): void => {
  ctx.body = 'Success';
};
