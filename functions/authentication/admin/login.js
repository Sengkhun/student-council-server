import bcrypt from 'bcrypt';
import { ADMIN } from 'constants';
import { Users } from 'models';
import { ForbiddenError } from 'errors';
import { generateToken } from '/functions/authentication/token';

// =====================================================

export const loginWithPassword = async args => {
  const { username, password } = args;
  const user = await Users
    .findOne({ username, roles: ADMIN, type: ADMIN })
    .select('password')
    .lean();

  if (!user) {
    throw new ForbiddenError('Wrong credential');
  }

  // verify password
  const hashPassword = user.password && user.password.bcrypt;
  const valid = await bcrypt.compare(password, hashPassword);
  if (!valid) {
    throw new ForbiddenError('Wrong credential');
  }

  // generate token
  const token = await generateToken(user._id);
  return token;
};  
