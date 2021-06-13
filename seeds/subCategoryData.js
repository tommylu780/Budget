const { SubCategory } = require("../models");

const subCategoryData = [
  {
    subcategory_name: "Restaurants",
    parent_category_id: 3,
  },
  {
    subcategory_name: "Rent",
    parent_category_id: 1,
  },
  {
    subcategory_name: "Groceries",
    parent_category_id: 1,
  },
  {
    subcategory_name: "Bars",
    parent_category_id: 3,
  },
  {
    subcategory_name: "Cafes",
    parent_category_id: 3,
  },
  {
    subcategory_name: "Petrol",
    parent_category_id: 2,
  },
  {
    subcategory_name: "Tickets",
    parent_category_id: 3,
  },
  {
    subcategory_name: "Clothes",
    parent_category_id: 4,
  },
  {
    subcategory_name: "Gym Membership",
    parent_category_id: 4,
  },
];

const seedSubCategory = () => SubCategory.bulkCreate(subCategoryData);

module.exports = seedSubCategory;
