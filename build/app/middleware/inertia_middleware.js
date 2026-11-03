import UserTransformer from '#transformers/user_transformer';
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware';
export default class InertiaMiddleware extends BaseInertiaMiddleware {
    share(ctx) {
        const { auth, request } = ctx;
        const theme = request?.plainCookie('app_theme', {
            defaultValue: 'light',
            encoded: false,
        }) ?? 'light';
        return {
            errors: ctx.inertia.always(this.getValidationErrors(ctx)),
            user: ctx.inertia.always(auth?.user ? UserTransformer.transform(auth.user) : undefined),
            preferences: ctx.inertia.always({ theme }),
        };
    }
    flash(ctx) {
        const { session } = ctx;
        const success = session?.flashMessages.get('success');
        const error = session?.flashMessages.get('error');
        return { success, error };
    }
    async handle(ctx, next) {
        await this.init(ctx);
        const output = await next();
        this.dispose(ctx);
        return output;
    }
}
//# sourceMappingURL=inertia_middleware.js.map