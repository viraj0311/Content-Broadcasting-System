import ApiError from "../../utils/ApiError.js";
import ContentRepository from "../../repositories/content.repository.js";

const listPending = async () => ContentRepository.findPending();

const approve = async (contentId, principalId) => {
  const content = await ContentRepository.findById(contentId);
  if (!content) throw new ApiError(404, "Content not found");
  if (content.status !== "pending") throw new ApiError(400, "Only pending content can be approved");

  await content.update({
    status: "approved",
    approved_by: principalId,
    approved_at: new Date(),
    rejection_reason: null,
  });

  return content;
};

const reject = async (contentId, principalId, reason) => {
  const content = await ContentRepository.findById(contentId);
  if (!content) throw new ApiError(404, "Content not found");
  if (content.status !== "pending") throw new ApiError(400, "Only pending content can be rejected");

  await content.update({
    status: "rejected",
    approved_by: principalId,
    approved_at: new Date(),
    rejection_reason: reason,
  });

  return content;
};

export default { listPending, approve, reject };
