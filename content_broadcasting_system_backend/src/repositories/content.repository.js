import { Op } from "sequelize";
import { Content, ContentSchedule, ContentSlot } from "../models/index.js";

const ContentRepository = {
  createWithSchedule: async (payload) => {
    const slot = await ContentSlot.findOrCreate({
      where: { subject: payload.subject.toLowerCase() },
      defaults: { subject: payload.subject.toLowerCase() },
    });
    const slotRecord = slot[0];

    const content = await Content.create(payload);
    await ContentSchedule.create({
      content_id: content.id,
      slot_id: slotRecord.id,
      rotation_order: payload.rotation_order || 1,
      duration_minutes: payload.duration_minutes || 5,
    });

    return content;
  },

  findByTeacher: async (teacherId) => {
    return Content.findAll({
      where: { uploaded_by: teacherId },
      include: [{ model: ContentSchedule, as: "schedule", include: [{ model: ContentSlot, as: "slot" }] }],
      order: [["created_at", "DESC"]],
    });
  },

  findPending: async () => {
    return Content.findAll({
      where: { status: "pending" },
      include: [{ model: ContentSchedule, as: "schedule", include: [{ model: ContentSlot, as: "slot" }] }],
      order: [["created_at", "DESC"]],
    });
  },

  findById: async (id) => {
    return Content.findByPk(id, {
      include: [{ model: ContentSchedule, as: "schedule", include: [{ model: ContentSlot, as: "slot" }] }],
    });
  },

  findLiveApprovedByTeacher: async (teacherId, subject) => {
    const now = new Date();
    const where = {
      uploaded_by: teacherId,
      status: "approved",
      start_time: { [Op.lte]: now },
      end_time: { [Op.gte]: now },
    };

    if (subject) {
      where.subject = String(subject).toLowerCase();
    }

    return Content.findAll({
      where,
      include: [{ model: ContentSchedule, as: "schedule", include: [{ model: ContentSlot, as: "slot" }] }],
      order: [
        ["subject", "ASC"],
        [{ model: ContentSchedule, as: "schedule" }, "rotation_order", "ASC"],
      ],
    });
  },
};

export default ContentRepository;
