import { Next, ParameterizedContext } from 'koa';
import Router from 'koa-router';

export type KoaStateType = {
  user: (TokenType & { iat: number; exp: number }) | null;
};

export type CtxType = ParameterizedContext<KoaStateType, Router.IRouterParamContext<any, Record<string, unknown>>>;

export type NextType = Next;

type TokenType = { _id: string; username: string; avatarUrl: string };

// Global

export type AuthRequestBody = {
  username: string;
  password: string;
};
