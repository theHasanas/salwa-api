//slugify
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Cookie = sequelize.define("Cookie", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Cookie, {
    source: ["name"],
  });

  return Cookie;
};
