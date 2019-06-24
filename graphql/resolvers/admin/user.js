import { ADMIN } from 'constants';
import { errorHandler, RuntimeError } from 'errors';
import { isAllow } from '/functions/middlewares';
import { changePassword } from '/functions/authentication/password';
import { createAccountAdmin, editAccount } from '/functions/user/mutation';
import { getUser } from '/functions/user/query';

export default {

  Query: {

    getCurrentUserAdmin: async (parent, args, { user }) => {
      try {
        await isAllow(user, ADMIN);
        const query = { _id: user._id, status: true };
        const currentUser = await getUser(query);
        return { ok: true, user: currentUser };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  },

  Mutation: {

    createUserAdmin: async (parent, args, context) => {
      try {
        await createAccountAdmin(args);
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }, 

    editUserNameAdmin: async (parent, args, { user }) => {
      const { firstName, lastName } = args;
      try {
        await isAllow(user, ADMIN);
        const query = { _id: user._id, status: true };
        const fields = { firstName, lastName };
        const affected = await editAccount({ query, fields });

        if (affected.nModified <= 0) {
          throw new RuntimeError();
        }
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    },

    editUserPasswordAdmin: async (parent, args, context) => {
      const { currentPassword, newPassword, confirmPassword } = args;
      try {
        await isAllow(user, ADMIN);
        await changePassword({
          userId: user._id,
          currentPassword,
          newPassword,
          confirmPassword
        })
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

}