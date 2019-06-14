import { model } from "mongoose";
import feedbackChatSchema from './schema';

const FeedbackChats = model('feedback_chats', feedbackChatSchema);

export default FeedbackChats;
