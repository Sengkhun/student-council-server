import _ from 'lodash';
import bcrypt from 'bcrypt';
import { 
  ForbiddenError, 
  RuntimeError,
  UserInputError
} from 'errors';
import { Users } from 'models';
import { checkPassword } from './validation';

// =====================================================

export const verifyPassword = async ({ hashedPassword, password }) => {
  const valid = await bcrypt.compare(password, hashedPassword);
  if (!valid) {
    throw new ForbiddenError('Wrong credential');
  }
};

// function check if new password already used
export const verifyNewPassword = async ({ userId, newPassword }) => {
  const user = await Users
    .findOne({ _id: userId })
    .select('oldPasswords')
    .lean();

  if (!user) {
    throw new RuntimeError('Invalid user id!');
  }

  const { oldPasswords } = user;
  await Promise.all(
    await _.map(oldPasswords, async (oldPassword) => {
      const isUsed = await bcrypt.compare(newPassword, oldPassword.bcrypt);
      if (isUsed) {
        throw new UserInputError('You already used this password');
      }
    })
  );
};

// =====================================================

export const changePassword = async args => {
  const { 
    userId, currentPassword, 
    newPassword, confirmPassword 
  } = args;

  const user = await Users
    .findOne({ _id: userId })
    .select('password')
    .lean();

  if (!user) {
    throw new RuntimeError('Invalid user id!');
  }

  // verify current password
  const currentHashedPassword = user.password && user.password.bcrypt;
  await verifyPassword({ 
    hashedPassword: currentHashedPassword, 
    password: currentPassword 
  });

  // check and create hash password
  const hashedPassword = await checkPassword({
    password: newPassword,
    confirmPassword,
    encrypt: true
  });

  // check if new password already used
  await verifyNewPassword({ userId, newPassword });

  // update password
  const affected = await Users.updateOne(
    { _id: userId },
    { 
      $set: { password: { bcrypt: hashedPassword } },
      $push: { oldPasswords: user.password }
    }
  );

  if (affected.nModified <= 0) {
    throw new RuntimeError();
  }
};
