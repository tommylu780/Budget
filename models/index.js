const ParentCategory = require("./parentCategory");
const SubCategory = require("./subCategory");
const Expense = require("./expense");
const User = require("./user");

ParentCategory.hasMany(SubCategory, {
    foreignKey: "parent_category_id",
});

SubCategory.belongsTo(ParentCategory, {
    foreignKey: "parent_category_id",
});

SubCategory.hasMany(Expense, {
    foreignKey: "sub_category_id",
});

Expense.belongsTo(SubCategory, {
    foreignKey: "sub_category_id",
});

User.hasMany(Expense, {
    foreignKey: "user_id",
});

Expense.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { ParentCategory, SubCategory, Expense, User };