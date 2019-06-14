import { model } from "mongoose";
import announcementSchema from './schema';

const Announcements = model('announcements', announcementSchema);

export default Announcements;
