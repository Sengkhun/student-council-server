import _ from 'lodash';
import check from 'check-types';
import { 
  AuthenticationError, 
  ForbiddenError 
} from 'errors';

// =====================================================

export const isAllow = async (user, roles, types) => {
  if (user) {

    let roleValidate = false;
    if (check.array(roles)) {
      _.forEach(user.roles, role => {
        const match = _.includes(roles, role);
        if (match) {
          roleValidate = true;
          return false;
        }
      });

    } else if (_.includes(user.roles, roles)) {
      roleValidate = true;
    }

    // check if role not valid
    if (!roleValidate) {
      throw new ForbiddenError();
    }

    if (types) {
      let typeValidate = false;
      if (check.array(types)) {
        const match = _.includes(types, user.type);
        if (match) {
          typeValidate = true;
        }
      } else if (types === user.type) {
        typeValidate = true;
      }

      if (!typeValidate) {
        throw new ForbiddenError();
      }
    }
  } else {
    throw new AuthenticationError();
  }
};
