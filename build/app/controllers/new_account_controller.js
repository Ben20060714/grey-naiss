import User from '#models/user';
import { signupValidator } from '#validators/user';
export default class NewAccountController {
    async create({ inertia }) {
        return inertia.render('auth/signup', {});
    }
    async store({ request, response, auth }) {
        const { fullName, email, password } = await request.validateUsing(signupValidator);
        const user = await User.create({ fullName, email, password });
        await auth.use('web').login(user);
        response.redirect().toRoute('dashboard');
    }
}
//# sourceMappingURL=new_account_controller.js.map