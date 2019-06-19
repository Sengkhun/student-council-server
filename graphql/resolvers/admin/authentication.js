import { ADMIN } from 'constants';
import { errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { loginWithPassword } from '/functions/authentication/admin/login';
import { removeToken } from '/functions/authentication/token';
import { getUser } from '/functions/user/query';

export default {

  Mutation: {

    loginAdmin: async (parent, args, context) => {
      try {
        const { email, password } = args;
        const token = await loginWithPassword({ email, password });
        return { ok: true, response: { token } };
        
      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    },

    verifyTokenAdmin: async (parent, args, { user }) => {
      try {
        await isAllow(user, ADMIN, ADMIN);
        const query = { _id: user._id, status: true };
        const userInfo = await getUser(query);
        return { ok: true, user: userInfo };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    },

    logoutAdmin: async (parent, { token }, { user }) => {
      try {
        await isAllow(user, ADMIN, ADMIN);
        await removeToken(user._id, { token });
        return { ok: true };
        
      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }
  

  }

};
