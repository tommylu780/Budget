const router = require('express').Router();
const { Expense, ParentCategory, SubCategory } = require('../models');
const { check, validationResult } = require('express-validator');

router.get('/expense/:id', async (req, res) => {
    const string = req.params.id
    console.log(req.params.id)
    console.log(parseInt(string))
    try {
        const expensedata = await Expense.findAll({
            where: {
                user_id: parseInt(string)
            }
        })
        res.status(200).json(expensedata)
        //maybe write logic to turn into array then use client side logic to put onto page
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/expense',
    check('amount').isNumeric().withMessage('Amount can only contain numbers'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newexpense = await Expense.create({
                expense_name: req.body.expense_name,
                amount: req.body.amount,
                sub_category_id: req.body.subcategory_id,
                user_id: req.session.user_id
            })
            res.status(200).json(newexpense)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    })


router.delete('/expense/:id', async (req, res) => {
    try {
        console.log('req.body')
        console.log(req.body)
        const expensedata = await Expense.destroy({
            where: {
                id: req.body.expense_id
            }
        })
        if (!expensedata) {
            res.status(404).json({ message: "no expense with this id" });
            return;
        }
        res.status(200).json(expensedata)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/category', async (req, res) => {
    try {
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
        const expenses = expenseData.map((expense_name) => expense_name.get({ plain: true }));
        let amountArr = []
        expenses.forEach((i) => {
            thisId = i.subCategory.parent_category_id.toString();
            reqId = req.body.category_id.toString();

            if (thisId === reqId) {
                console.log(true)
                amountArr.push(i.amount)
            }
        })
        function sumAmount(total, num) {
            return total + num;
        }
        totalSpent = amountArr.reduce(sumAmount);
        res.status(200).json({ totalSpent });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



module.exports = router
