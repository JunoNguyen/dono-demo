const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const products = await Product.insertMany([
    {
      name: 'Donation',
      description:
        '$10 Donation',
      price: 10,
    },
    {
      name: 'Donation',
      description:
        '$20 Donation',
      price: 20,
    },
    {
      name: 'Donation',
      description:
        '$50 Donation',
      price: 50,
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
