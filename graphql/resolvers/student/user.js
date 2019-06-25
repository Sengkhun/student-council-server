import { USER } from 'constants';
import { errorHandler, RuntimeError } from 'errors';
import { isAllow } from '/functions/middlewares';
import { changePassword } from '/functions/authentication/password';
import { createAccountUser, editAccount } from '/functions/user/mutation';
import { getUser } from '/functions/user/query';

export default {

  Query: {

    userGetCurrentUser: async (parent, args, { user }) => {
      try {
        await isAllow(user, USER);
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

    userCreateUser: async (parent, args, context) => {
      try {
        await createAccountUser(args);
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }, 

    userEditUserName: async (parent, args, { user }) => {
      const { firstName, lastName } = args;
      try {
        await isAllow(user, USER);
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

    userEditUserPassword: async (parent, args, { user }) => {
      const { currentPassword, newPassword, confirmPassword } = args;
      try {
        await isAllow(user, USER);
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