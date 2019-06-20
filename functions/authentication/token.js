import bcrypt from 'bcrypt';
import { Users } from 'models';
import { RuntimeError } from 'errors';

// =====================================================

export const getUserByToken = async token => {
  if (!token) return null;

  const user = await Users
    .findOne({ 'loginTokens.token': token })
    .select('role')
    .lean();

  // update last access time
  await Users.updateOne(
    { 'loginTokens.token': token },
    { $set: { 'loginTokens.$.updatedAt': new Date() } }
  );

  return user;
};

// =====================================================

export const generateToken = async user_id => {
  const payload = user_id.toString()
  const token = await bcrypt.hash(payload, 2);
  const loginTokens = { token };

  const affected = await Users.updateOne(
    { _id: user_id, status: true },
    { $push: { loginTokens } }
  );

  if (affected.nModified <= 0) {
    throw new RuntimeError('Cannot generate token');
  }
  
  return token;
};

// =====================================================

export const removeToken = async (user_id, { token }) => {
  const affected = await Users.updateOne(
    { _id: user_id, 'loginTokens.token': token },
    { $pull: { 'loginTokens': { token } } }
  );

  if (affected.nModified <= 0) {
    console.log('Remove token fail! Token not found!');
  }
};
