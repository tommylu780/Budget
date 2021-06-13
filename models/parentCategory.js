const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ParentCategory extends Model {}

ParentCategory.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    primaryKey: true,
    modelName: "parentCategory",
});

module.exports = ParentCategory;