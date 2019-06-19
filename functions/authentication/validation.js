import bcrypt from 'bcrypt';
import { UserInputError } from 'errors';

// =====================================================

export const checkEmail = async email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail = regex.test(email);
  if (!isEmail) {
    throw new UserInputError('Please enter proper email');
  }
  
  const isParagonEmail = email.split('@')[1] === 'paragoniu.edu.kh';
  if (!isParagonEmail) {
    throw new UserInputError('Only paragon email is accepted!')
  }
};

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
