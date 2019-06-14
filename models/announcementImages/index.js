import { model } from "mongoose";
import announcementImageSchema from './schema';

const AnnouncementImages = model('announcement_images', announcementImageSchema);

export default AnnouncementImages;
