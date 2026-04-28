import { User } from "../models/index.js";

const UserRepository = {
  findByEmail: async (email) => User.findOne({ where: { email } }),
  create: async (data) => User.create(data),
};

export default UserRepository;
