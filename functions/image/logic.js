import _ from 'lodash';
import fs from 'fs';
import im from 'imagemagick';
import Jimp from 'jimp';
import uniqid from 'uniqid';
import path from 'path';
import { promisify } from 'promise-callbacks';
import { THUMBNAIL_FOLDER } from 'constants';
import { RuntimeError } from 'errors';

// =====================================================

export const storeFS = async (folder, file) => {
  let stream = null;
  try {
    const { mimetype, createReadStream } = await file;
    stream = createReadStream();

    const extension = _.last(mimetype.split('/') || 'jpg') ;
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

// =====================================================

export const ImageConverter = async args => {
  const { imagePath, extension, removeOriginal } = args;

  if (fs.existsSync(imagePath)) {
    try {
      const dir = path.dirname(imagePath);
      const filename = path.basename(imagePath).split('.')[0];
      const newPath = `${dir}/${filename}.${extension || 'jpg'}`;
      
      // convert image
      const convert = promisify.method(im, 'convert');
      await convert([imagePath, newPath]);

      if (removeOriginal) {
        await removeLocalImage(imagePath);  // remove heic image
      }
      return newPath;

    } catch (error) {
      throw new RuntimeError('Cannot convert HEIC image file!');
    }
  } else {
    throw new RuntimeError('image not found');
  }
};

// =====================================================

export const imageTypeHandler = async args => {
  const { imagePath } = args;

  const extension = _.last(imagePath.split('.')).toLowerCase() || JPG;
  const allowExtensions = [JPEG, JPG, PNG, HEIC];
  const isAllow = _.includes(allowExtensions, extension);

  if (!isAllow) {
    throw new RuntimeError(`Image type .${extension} is not allow`);
  }

  if (extension === HEIC) {
    await imageConverter({ imagePath, removeOriginal: true });
  }
};
