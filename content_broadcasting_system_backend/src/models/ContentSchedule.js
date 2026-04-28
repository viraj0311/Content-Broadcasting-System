import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const ContentSchedule = sequelize.define(
  "content_schedule",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    content_id: { type: DataTypes.INTEGER, allowNull: false },
    slot_id: { type: DataTypes.INTEGER, allowNull: false },
    rotation_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    duration_minutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
  },
  {
    tableName: "content_schedule",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    underscored: true,
  },
);

export default ContentSchedule;
