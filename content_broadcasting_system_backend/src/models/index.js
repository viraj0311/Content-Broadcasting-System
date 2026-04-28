import { sequelize } from "../config/dbConfig.js";
import User from "./User.js";
import Content from "./Content.js";
import ContentSlot from "./ContentSlot.js";
import ContentSchedule from "./ContentSchedule.js";

Content.belongsTo(User, { foreignKey: "uploaded_by", as: "teacher" });
Content.belongsTo(User, { foreignKey: "approved_by", as: "principal" });
User.hasMany(Content, { foreignKey: "uploaded_by", as: "uploaded_content" });

ContentSchedule.belongsTo(Content, { foreignKey: "content_id", as: "content" });
ContentSchedule.belongsTo(ContentSlot, { foreignKey: "slot_id", as: "slot" });
Content.hasOne(ContentSchedule, { foreignKey: "content_id", as: "schedule" });
ContentSlot.hasMany(ContentSchedule, { foreignKey: "slot_id", as: "schedules" });

export { sequelize, User, Content, ContentSlot, ContentSchedule };
