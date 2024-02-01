module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'categories',
      timestamps: false,
      underscored: true,
    }
  );

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogPosts' })
  // }
  return Category;
};