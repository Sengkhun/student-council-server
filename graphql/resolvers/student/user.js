import { Users } from 'models';

export default {

  Query: {

    getUser: async (parent, args, context) => {
      const user = await Users.findOne({ firstName: args.name });
      return { ok: true, user: user }
    }

  },

  Mutation: {

    createUser: async (parent, args, context) => {
      const { firstName, lastName } = args;
      const user = await Users.create({ 
        firstName, 
        lastName
      });
      console.log(user);
      return { ok: true };
    }

  }

};