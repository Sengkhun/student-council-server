import { model } from "mongoose";
import feedbackSchema from './schema';

const Feedbacks = model('feedbacks', feedbackSchema);

export default Feedbacks;
