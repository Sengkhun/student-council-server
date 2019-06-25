import bcrypt from 'bcrypt';
import { USER } from 'constants';
import { Users } from 'models';
import { ForbiddenError } from 'errors';
import { generateToken } from '/functions/authentication/token';

// =====================================================

export const loginWithPassword = async args => {
  const { email, password } = args;
  const user = await Users
    .findOne({ 'email.address': email.toLowerCase(), role: USER })
    .select('password role')
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
  return { token, role: user.role };
};  
