import authService from "../../services/auth.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const registerPrincipal = async (req, res) => {
  try {
    const result = await authService.registerUser({ ...req.body, role: "principal" });
    return successResponse(result, "Principal registered successfully", res, 201);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const loginPrincipal = async (req, res) => {
  try {
    const result = await authService.login({ ...req.body, role: "principal" });
    return successResponse(result, "Login successful", res);
  } catch (err) {
    return errorResponse(err, res);
  }
};
