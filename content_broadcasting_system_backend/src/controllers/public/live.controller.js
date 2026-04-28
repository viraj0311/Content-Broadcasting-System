import liveService from "../../services/public/live.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const getLiveContent = async (req, res) => {
  try {
    const result = await liveService.getLiveContent(Number(req.params.teacherId), req.query.subject);
    return successResponse(result, result.message, res);
  } catch (err) {
    return errorResponse(err, res);
  }
};
