const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Music extends Model {}

Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    artist_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album_image: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "music_tag",
  }
);

module.exports = Music;

// data needed:
// artist_name,  album  , the image of the album , song name
