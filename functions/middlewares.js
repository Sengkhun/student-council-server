import _ from 'lodash';
import { 
  AuthenticationError, 
  ForbiddenError 
} from 'errors';

// =====================================================

export const isAllow = async (user, roles) => {
  if (user) {
    const roleValidate = _.includes(roles, user.role);

    // check if role not valid
    if (!roleValidate) {
      throw new ForbiddenError();
    }
  } else {
    throw new AuthenticationError();
  }
};
