import { model } from "mongoose";
import imageSchema from './schema';

const Images = model('images', imageSchema);

export default Images;
