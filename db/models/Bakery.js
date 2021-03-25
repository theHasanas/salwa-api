const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Bakery = sequelize.define("Bakery", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Bakery, {
    source: ["name"],
  });
  return Bakery;
};
