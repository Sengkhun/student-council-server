import { model } from "mongoose";
import feedbackResponseSchema from './schema';

const FeedbackResponses = model('feedback_responses', feedbackResponseSchema);

export default FeedbackResponses;
