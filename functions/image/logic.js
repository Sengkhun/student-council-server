import _ from 'lodash';
import fs from 'fs';
import Jimp from 'jimp';
import uniqid from 'uniqid';
import path from 'path';
import { THUMBNAIL_FOLDER } from 'constants';
import { RuntimeError } from 'errors';

// =====================================================

export const storeFS = async (folder, file) => {
  let stream = null;
  try {
    const { mimetype, createReadStream } = await file;
    stream = createReadStream();

    const allowExtensions = ['jpg', 'jpeg', 'png'];
    let extension = _.last(mimetype.split('/')) ;
    if (!_.includes(allowExtensions, extension)) {
      throw new RuntimeError(`${extension} file is not allow!`);
    }
    const path = `${folder}${uniqid()}.${extension}`;

    return new Promise((resolve, reject) =>
      stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => { 
        if (stream)
          stream.destroy();
        resolve(path);
      })
    );

  } catch (error) {   
    if (stream)
      stream.destroy();
    throw error;
  }
};

// =====================================================

export const createImageThumbnail = async imagePath => {
  const imageName = await path.basename(imagePath);
  const thumbnailPath = `${THUMBNAIL_FOLDER}${imageName}`;

  const image = await Jimp.read(imagePath);
  await image
    .resize(Jimp.AUTO, 100)
    .quality(80)
    .write(thumbnailPath);

  return thumbnailPath;
};

// =====================================================

export const resizeImage = async ({ imagePath, width, height }) => {
  const image = await Jimp.read(imagePath);
  await image
    .resize(width || Jimp.AUTO, height || Jimp.AUTO)
    .quality(80)
    .write(imagePath);
};

// =====================================================

export const removeLocalImage = image => {
  try {
    fs.unlinkSync(image);
  } catch (error) {
    fsError(error);
  }
};

// =====================================================

export const fsError = error => {
  if (error.code === 'ENOENT')
    throw new RuntimeError('File not found!');
  else
    throw new RuntimeError('Something went wrong with File System!');
};
