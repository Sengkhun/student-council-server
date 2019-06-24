import { Feedbacks } from 'models';

export default {

  Query: {

    getFeedbackAdmin: async (parent, args, context) => {
      const { limit, skip } = args;
      try{
        const feeds = await Feedbacks.find({})
          .sort({_id: -1})
          .skip(skip)
          .limit(limit)
          .exec();

        return {
          ok: true, 
          feedbacks: feeds
        };
      }catch (error) {
        error = errorHandler(error);
        return { 
          ok: false, 
          error 
        };
      }
    },

    getPinFeedbackAdmin: async (parent, args, context) => {
      const { limit, skip } = args;
      try{
        const feeds = await Feedbacks.find({ pin: true })
          .sort({_id: -1})
          .skip(skip)
          .limit(limit)
          .exec();

        return {
          ok: true, 
          feedbacks: feeds
        };
      }catch (error) {
        error = errorHandler(error);
        return { 
          ok: false, 
          error 
        };
      }
    },

    getFeedbackDetailAdmin: async (parent, args, context) => {
      const { feedbackId } = args;
      try{
        const feed = await Feedbacks.findOne({ _id: feedbackId });
      
        return {
          ok: true,
          feedback: feed
        };
      }catch (error) {
        error = errorHandler(error);
        return { 
          ok: false, 
          error 
        };
      }
    }

  }

}
