import teacherContentService from "../../services/teacher/content.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const uploadContent = async (req, res) => {
  try {
    const result = await teacherContentService.uploadContent(req.user.id, req.body, req.file);
    return successResponse(result, "Content uploaded and pending approval", res, 201);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const listMyContent = async (req, res) => {
  try {
    const result = await teacherContentService.listMyContent(req.user.id);
    return successResponse(result, "Content fetched successfully", res);
  } catch (err) {
    return errorResponse(err, res);
  }
};
