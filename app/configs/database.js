require('dotenv').config();

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'api_project',
    col_product: 'product',
    col_category: 'category',
    col_users: 'Users'
};