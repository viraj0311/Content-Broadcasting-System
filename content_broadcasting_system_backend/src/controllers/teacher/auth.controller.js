import authService from "../../services/auth.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const registerTeacher = async (req, res) => {
  try {
    const result = await authService.registerUser({ ...req.body, role: "teacher" });
    return successResponse(result, "Teacher registered successfully", res, 201);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const loginTeacher = async (req, res) => {
  try {
    const result = await authService.login({ ...req.body, role: "teacher" });
    return successResponse(result, "Login successful", res);
  } catch (err) {
    return errorResponse(err, res);
  }
};
