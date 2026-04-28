import ApiError from "../../utils/ApiError.js";
import ContentRepository from "../../repositories/content.repository.js";

const uploadContent = async (teacherId, body, file) => {
  if (!file) {
    throw new ApiError(422, "File is required");
  }

  const payload = {
    title: body.title,
    description: body.description || null,
    subject: String(body.subject).toLowerCase(),
    file_path: file.location || file.path,
    file_type: file.mimetype,
    file_size: file.size || file.contentLength || 0,
    uploaded_by: teacherId,
    status: "pending",
    start_time: body.start_time || null,
    end_time: body.end_time || null,
    rotation_order: body.rotation_order || 1,
    duration_minutes: body.duration_minutes || 5,
  };

  if (!payload.start_time || !payload.end_time) {
    payload.start_time = null;
    payload.end_time = null;
  }

  return ContentRepository.createWithSchedule(payload);
};

const listMyContent = async (teacherId) => ContentRepository.findByTeacher(teacherId);

export default { uploadContent, listMyContent };
