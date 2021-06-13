const { User } = require('../models');

const dummyuserdata = [
    {
        username: "username1",
        email: "person1@gmail.com",
        password: "password1"
    },
    {
        username: "username2",
        email: "person2@gmail.com",
        password: "password2"
    },
    {
        username: "username3",
        email: "person3@gmail.com",
        password: "password3"
    },
    {
        username: "username4",
        email: "person4@gmail.com",
        password: "password4"
    },
];

const seeddummydata = () => User.bulkCreate(dummyuserdata);

module.exports = seeddummydata