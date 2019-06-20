export default {

  Query: {

    getFeedbackAdmin: async (parent, args, context) => {
      const { limit, skip } = args;
    },

    getPinFeedbackAdmin: async (parent, args, context) => {
      const { limit, skip } = args;
    },

    getFeedbackDetailAdmin: async (parent, args, context) => {
      const { feedbackId } = args;
    }

  }

}