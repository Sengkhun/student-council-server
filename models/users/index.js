import { model } from "mongoose";
import userSchema from './schema';

const Users = model('users', userSchema);

export default Users;
