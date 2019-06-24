import { Feedbacks } from 'models';

export default {

  Query: {

    getFeedbackAdmin: async (parent, args, context) => {
      const { limit, skip } = args;
      const feeds = await Feedbacks.find({})
        .sort({_id: -1})
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        ok: true, 
        feedbacks: feeds
      };
    },

    getPinFeedbackAdmin: async (parent, args, context) => {
      const { limit, skip } = args;
      const feeds = await Feedbacks.find({ pin: true })
        .sort({_id: -1})
        .skip(skip)
        .limit(limit)
        .exec();

      return {
        ok: true, 
        feedbacks: feeds
      };
    },

    getFeedbackDetailAdmin: async (parent, args, context) => {
      const { feedbackId } = args;
      const feed = await Feedbacks.findOne({ _id: feedbackId });
      
      return {
        ok: true,
        feedback: feed
      };
    }

  }

}
