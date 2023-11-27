'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'ABCDEF',
        lastName: 'QWERTY',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        bio: 'THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY '
      },
      {
        email: 'user1@user.io',
        firstName: 'ASDFGH',
        lastName: 'ZXCVBN',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        bio: 'THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY '
      },
      {
        email: 'user2@user.io',
        firstName: 'POIUYT',
        lastName: 'LKJHGF',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        bio: 'THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY THIS IS A BIOGRAPHY '
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
