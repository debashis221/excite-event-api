import UserModel, { User } from "../model/user.model";

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function updateUser(id: string, input: Partial<User>) {
  return UserModel.findByIdAndUpdate(id, input, { new: true });
}

export function deleteUser(id: string) {
  return UserModel.findByIdAndDelete(id);
}

export function getAllUSers(role: string) {
  let query = {};
  if (role) {
    query = { role };
  }
  return UserModel.find(query);
}

export function getAllOnlineUsers() {
  return UserModel.find({ isLoggedIn: true });
}
