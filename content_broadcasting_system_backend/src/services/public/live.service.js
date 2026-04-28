import ContentRepository from "../../repositories/content.repository.js";
import { pickActiveFromRotatingList } from "../../utils/scheduler.js";

const getLiveContent = async (teacherId, subject) => {
  const items = await ContentRepository.findLiveApprovedByTeacher(teacherId, subject);
  if (!items.length) {
    return { message: "No content available", items: [] };
  }

  const bySubject = new Map();
  for (const content of items) {
    const key = content.subject;
    if (!bySubject.has(key)) bySubject.set(key, []);
    bySubject.get(key).push({
      id: content.id,
      title: content.title,
      description: content.description,
      subject: content.subject,
      file_path: content.file_path,
      start_time: content.start_time,
      end_time: content.end_time,
      duration_minutes: content.schedule?.duration_minutes || 5,
      rotation_order: content.schedule?.rotation_order || 1,
    });
  }

  const active = [];
  for (const [, list] of bySubject.entries()) {
    list.sort((a, b) => a.rotation_order - b.rotation_order);
    const selected = pickActiveFromRotatingList(list);
    if (selected) active.push(selected);
  }

  if (!active.length) {
    return { message: "No content available", items: [] };
  }

  return { message: "Live content fetched successfully", items: active };
};

export default { getLiveContent };
