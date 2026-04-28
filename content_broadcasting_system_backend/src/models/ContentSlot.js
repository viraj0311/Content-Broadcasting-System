import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const ContentSlot = sequelize.define(
  "content_slot",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: "content_slots",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    underscored: true,
  },
);

export default ContentSlot;
