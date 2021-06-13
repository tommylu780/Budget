const { ParentCategory } = require('../models');

const parentCategoryData = [
    {
        category_name: 'home',
    },
    {
        category_name: 'transport',
    },
    {
        category_name: 'entertainment',
    },
    {
        category_name: 'personal',
    },
    {
        category_name: 'other',
    },
];

const seedParentCategory = () => ParentCategory.bulkCreate(parentCategoryData);

module.exports = seedParentCategory;