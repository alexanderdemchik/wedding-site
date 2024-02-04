import { Middleware } from 'koa';
import { KoaContext } from '../types/koa';
import { FormDto } from '../data/FormData';
import * as FormDataService from './formData.service';

export const create: Middleware = async (ctx: KoaContext<FormDto>) => {
    ctx.body = await FormDataService.create(ctx.request.body);
    ctx.status = 200;
};

export const update: Middleware = async (ctx: KoaContext<FormDto>) => {
    const id = ctx.params.id as string;
    ctx.body = await FormDataService.update(id, ctx.request.body);
    ctx.status = 200;
};

export const getAll: Middleware = async (ctx: KoaContext<FormDto>) => {
    ctx.body = await FormDataService.getAll();
    ctx.status = 200;
};

export const getById: Middleware = async (ctx: KoaContext<FormDto>) => {
    ctx.body = await FormDataService.getById(ctx.params.id);
    ctx.status = 200;
};
