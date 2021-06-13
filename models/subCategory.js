const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SubCategory extends Model {}

SubCategory.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "parentCategory",
            key: "id",
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "subCategory",
});

module.exports = SubCategory;