const router = require("express").Router();
const { SubCategory, Expense, ParentCategory, User } = require('../models');


router.get("/", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render("profile", { loggedIn: req.session.loggedIn });
        } else {
            res.render("login", { loggedIn: req.session.loggedIn });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/signup", async (req, res) => {
    try {
        res.render("signup");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/profile", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const userData = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password']
                }
            })
            const user = userData.get({ plain: true });
            const expenseData = await Expense.findAll({
                where: {
                    user_id: req.session.user_id,
                },
                include: [
                    {
                        model: SubCategory,
                        attributes: ['id', 'subcategory_name', 'parent_category_id'],
                        include: {
                            model: ParentCategory,
                            attributes: ['id', 'category_name']
                        }
                    }
                ],
            })
            const parentCategoryData = await ParentCategory.findAll().catch((err) => {
                res.json(err);
            })
            const parentcategories = parentCategoryData.map((parentcategory) => parentcategory.get({ plain: true }));
            console.log(parentcategories)

            console.log(user)

            const expenses = expenseData.map((expense_name) => expense_name.get({ plain: true }));
            console.log('expenses')
            console.log(expenses)
            let amountArr = []
            expenses.forEach((i) => {
                console.log(i.amount)
                amountArr.push(i.amount)
            })
            console.log('amount array:')
            console.log(amountArr)
            let totalSpent
            if (amountArr.length == 0) {
                totalSpent = 0
            } else {
                function sumAmount(total, num) {
                    return total + num;
                }
                totalSpent = amountArr.reduce(sumAmount)
            }
            console.log(`total spent: ${totalSpent}`)

            res.render("profile", { user, parentcategories, totalSpent, loggedIn: req.session.loggedIn });
        } else {
            res.redirect('/');

        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/expense", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const expenseData = await Expense.findAll({
                where: {
                    user_id: req.session.user_id,
                },
                include: [
                    {
                        model: SubCategory,
                        attributes: ['id', 'subcategory_name', 'parent_category_id'],
                        include: {
                            model: ParentCategory,
                            attributes: ['id', 'category_name']
                        }
                    }
                ],
            })
            const userData = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password']
                }
            })
            const user = userData.get({ plain: true });
            console.log(user)
            console.log(expenseData)
            const expenses = expenseData.map((expense_name) => expense_name.get({ plain: true }));
            let hasExpenses
            console.log(expenses)
            if (expenses.length === 0) {
                console.log('no expenses')
                hasExpenses = false
            } else {
                hasExpenses = true
            }
            console.log(hasExpenses)
            res.render("expense", { user, expenses, hasExpenses, loggedIn: req.session.loggedIn });
            return;
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/add", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const subCategoryData = await SubCategory.findAll().catch((err) => {
                res.json(err);
            })
            const subcategories = subCategoryData.map((subcategory) => subcategory.get({ plain: true }));
            console.log(subcategories)
            res.render("add", { subcategories, loggedIn: req.session.loggedIn });
            return;
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;