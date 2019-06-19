export default {

  Query: {

    getCurrentUserAdmin: async (parent, args, context) => {

    }

  },

  Mutation: {

    editUserNameAdmin: async (parent, args, context) => {
      const { firstName, lastName } = args;
    },

    editUserPasswordAdmin: async (parent, args, context) => {
      const { currentPassword, newPassword, confirmPassword } = args;
    }

  }

}