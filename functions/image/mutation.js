import { Images } from 'models';

// =====================================================

export const createImage = async args => {
  const { name, thumbnail, url } = args;
  const image = await Images.create({
    name, 
    thumbnail, 
    url
  });

  if (!image) {
    throw new RuntimeError();
  }

  return image;
};
