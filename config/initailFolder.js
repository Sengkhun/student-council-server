import fs from 'fs';
import { 
  ANNOUNCEMENT_FOLDER,
  FEEDBACK_FOLDER,
  THUMBNAIL_FOLDER,
  REPORT_FOLDER
} from 'constants';

// create public folder
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// create documents folder inside public folder
if (!fs.existsSync('public/documents')) {
  fs.mkdirSync('public/documents');
}

if (!fs.existsSync(ANNOUNCEMENT_FOLDER)) {
  fs.mkdirSync(ANNOUNCEMENT_FOLDER);
}

if (!fs.existsSync(FEEDBACK_FOLDER)) {
  fs.mkdirSync(FEEDBACK_FOLDER);
}

if (!fs.existsSync(THUMBNAIL_FOLDER)) {
  fs.mkdirSync(THUMBNAIL_FOLDER);
}

if (!fs.existsSync(REPORT_FOLDER)) {
  fs.mkdirSync(REPORT_FOLDER);
}



