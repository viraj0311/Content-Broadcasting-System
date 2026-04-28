import ApiError from "../utils/ApiError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import UserRepository from "../repositories/user.repository.js";

const registerUser = async ({ name, email, password, role }) => {
  const existing = await UserRepository.findByEmail(email);
  if (existing) {
    throw new ApiError(409, "Email already exists");
  }

  const password_hash = await hashPassword(password);
  const user = await UserRepository.create({ name, email, password_hash, role });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
};

const login = async ({ email, password, role }) => {
  const user = await UserRepository.findByEmail(email);
  if (!user || user.role !== role) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export default { registerUser, login };
