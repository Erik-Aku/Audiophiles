const { Model, DataTypes } = require("sequelize");

const sequelize = require("../configdfd/connection");

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "music",
  }
);

module.exports = Music;

// data needed:
// artist_name,  album  , the image of the album , song name
