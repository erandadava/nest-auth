import { User } from "src/users/users.entity";


export function createUserFromObject(obj: any): User {
  const user = new User();
  Object.assign(user, obj);

  // Ensure that the methods are present
  user.hashPassword = User.prototype.hashPassword;
  user.hashPasswordOnUpdate = User.prototype.hashPasswordOnUpdate;
  user.validatePassword = User.prototype.validatePassword;

  return user;
}
