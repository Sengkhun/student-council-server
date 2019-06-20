import { Users } from 'models';
import { ADMIN } from 'constants';
import { RuntimeError } from 'errors';
import { 
  checkEmail, 
  checkPassword
} from '/functions/authentication/validation';

// args = { firstName, lastName, email, password, confirmPassword }
export const createAccountAdmin = async args => {

  const { firstName, lastName, email, password, confirmPassword } = args;

  // check if paragonu email
  await checkEmail(email);

  // check and encrypt password
  const hashedPassword = await checkPassword({ 
    password,
    confirmPassword, 
    encrypt: true 
  });
  
  const user = await Users.create({
    firstName, 
    lastName,
    email: email && { address: email },
    password: { bcrypt: hashedPassword },
    role: ADMIN
  });
  
  if (!user) {
    throw new RuntimeError('Cannot create user');
  }

};

// =====================================================

export const deleteAccount = async userId => {
  if (userId) {
    await Users.deleteOne({ _id: userId || ' ' });
    await UserProfiles.deleteOne({ userId: userId || ' ' });
  }
};
