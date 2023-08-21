const mongoose = require('mongoose');
const fs = require('fs');

const databaseConfig = require('./app/configs/database');

const _dirFile_Product = __dirname + '/app/_data/product.json';
const _dirFile_Category = __dirname + '/app/_data/category.json';
const _dirFile_Users = __dirname + '/app/_data/user.json';

// --------------Connect database------------------------
(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.ripeili.mongodb.net/?retryWrites=true&w=majority`);
        console.log('CONNECTED MONGODB');
    } catch (error) {
        console.log('Error connecting to database');
    }
})();

// -----------------Collection--------------------------
const Product = require('./app/models/product');
const Category = require('./app/models/category');
const User = require('./app/models/user');

// -----------------Data import------------------------
const products = JSON.parse(fs.readFileSync(_dirFile_Product, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(_dirFile_Category, 'utf-8'));
const users = JSON.parse(fs.readFileSync(_dirFile_Users, 'utf-8'));

const importData = async () => {
    try {
        const promises = [
            Product.create(products),
            Category.create(categories),
            User.create(users)
        ];

        await Promise.all(promises);
        console.log('import data success');

    } catch (error) {
        console.log('import data fail');
        console.log(error);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        const promises = [
            Product.deleteMany({}),
            Category.deleteMany({}),
            User.deleteMany({})
        ];

        await Promise.all(promises);
        console.log('delete data success');
    } catch (error) {
        console.log('delete data fail');
        console.log(error);
    }
    process.exit();
}

switch (process.argv[2]) {
    case '-i':
        importData();
        break;
    case '-d':
        deleteData();
        break;
    default:
        break;
}




