import { ADMIN } from 'constants';
import { errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { createAccountAdmin } from '/functions/user/mutation';

export default {

  Query: {

    getCurrentUserAdmin: async (parent, args, context) => {
      
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

    editUserNameAdmin: async (parent, args, context) => {
      const { firstName, lastName } = args;
    },

    editUserPasswordAdmin: async (parent, args, context) => {
      const { currentPassword, newPassword, confirmPassword } = args;
    }

  }

}