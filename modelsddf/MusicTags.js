const { Model, DataTypes } = require("sequelize");

const sequelize = require("../configdfd/connection");

class MusicTag extends Model {}

MusicTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    music_id: {
      type: DataTypes.INTEGER,
      references:{
        model:"music",
        key:"id",
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "music_tag",
  }
);

module.exports = MusicTag;