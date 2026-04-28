import approvalService from "../../services/admin/approval.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const listPending = async (req, res) => {
  try {
    const result = await approvalService.listPending();
    return successResponse(result, "Pending content fetched successfully", res);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const approveContent = async (req, res) => {
  try {
    const result = await approvalService.approve(Number(req.params.id), req.user.id);
    return successResponse(result, "Content approved successfully", res);
  } catch (err) {
    return errorResponse(err, res);
  }
};

export const rejectContent = async (req, res) => {
  try {
    const result = await approvalService.reject(
      Number(req.params.id),
      req.user.id,
      req.body.rejection_reason,
    );
    return successResponse(result, "Content rejected successfully", res);
  } catch (err) {
    return errorResponse(err, res);
  }
};
