import bcrypt from 'bcrypt';
import { UserInputError } from 'errors';

// =====================================================

export const checkPassword = async ({ password, confirmPassword, encrypt }) => {
  if (password.length < 6) {
    throw new UserInputError('Password must be at least 6 characters');
  }

  if (password !== confirmPassword) {
    throw new UserInputError('The password and confirm password are not matched!')
  }

  if (encrypt) {
    const saltRounds = 8;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
};