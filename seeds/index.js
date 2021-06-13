const sequelize = require('../config/connection');
const seedParentCategory = require('./parentCategoryData');
const seedSubCategory = require('./subCategoryData');
const seeddummydata = require('./dummyuserdata')

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedParentCategory();
    await seedSubCategory();
    await seeddummydata();

    process.exit(0);
};

seedAll();