import _ from 'lodash';
import { 
  AuthenticationError, 
  ForbiddenError 
} from 'errors';

// =====================================================

export const isAllow = async (user, roles) => {
  if (user) {
    // check if role not valid
    if (roles !== user.role) {
      throw new ForbiddenError();
    }
  } else {
    throw new AuthenticationError();
  }
};
