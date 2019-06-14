import { model } from "mongoose";
import feedbackImageSchema from './schema';

const FeedbackImages = model('feedback_images', feedbackImageSchema);

export default FeedbackImages;
