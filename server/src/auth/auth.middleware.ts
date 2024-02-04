import Koa from 'koa';

export const authMiddleware: Koa.Middleware = async (ctx, next) => {
    const authHeader = ctx.headers['authorization'];
    if (authHeader === process.env.AUTH_TOKEN) {
        ctx.isAuthenticated = true;
    }
    await next();
};

export function requireAuth(ctx, next) {
    if (!ctx.user) {
        ctx.status = 403;
        ctx.body = {
            message: 'Forbidden',
        };

        return;
    }

    next();
}
