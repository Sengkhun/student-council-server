import { USER } from 'constants';
import { errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { loginWithPassword } from '/functions/authentication/user/login';
import { removeToken } from '/functions/authentication/token';
import { getUser } from '/functions/user/query';

export default {

  Mutation: {

    userLogin: async (parent, args, context) => {
      try {
        const { email, password } = args;
        const { token, role } = await loginWithPassword({ email, password });
        return { ok: true, response: { token, role } };
        
      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    },

    userVerifyToken: async (parent, args, { user }) => {
      try {
        await isAllow(user, USER);
        const query = { _id: user._id, status: true };
        const userInfo = await getUser(query);
        return { ok: true, user: userInfo };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    },

    userLogout: async (parent, { token }, { user }) => {
      try {
        await isAllow(user, USER);
        await removeToken(user._id, { token });
        return { ok: true };
        
      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }
  

  }

};
