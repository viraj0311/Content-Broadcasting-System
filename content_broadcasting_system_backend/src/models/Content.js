import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Content = sequelize.define(
  "content",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    subject: { type: DataTypes.STRING, allowNull: false },
    file_path: { type: DataTypes.STRING, allowNull: false },
    file_type: { type: DataTypes.STRING, allowNull: false },
    file_size: { type: DataTypes.INTEGER, allowNull: false },
    uploaded_by: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("uploaded", "pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    rejection_reason: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    approved_by: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    approved_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    start_time: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    end_time: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
  },
  {
    tableName: "content",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    underscored: true,
  },
);

export default Content;
