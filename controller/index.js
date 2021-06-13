const router = require('express').Router();

const htmlroutes = require('./htmlroutes')

const userroutes = require('./user-routes')

const purchase = require('./expense-route')

router.use('/', htmlroutes)

router.use('/user', userroutes);

router.use('/purchase', purchase)



module.exports = router