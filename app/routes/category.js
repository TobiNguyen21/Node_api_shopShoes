const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async')

const main_Controller = require(`../controllers/categories_Controller`);
const main_Validate = require('../validates/category');

const middle_verifyToken = require('../middleware/verifyToken');
const middle_authorize = require('../middleware/authorize');

router.get('/', asyncHandler(main_Controller.getListItems));

router.get('/:id', asyncHandler(main_Controller.getProducts));

router.post('/add', middle_verifyToken, middle_authorize("publisher", "admin"), main_Validate.validator(), asyncHandler(main_Controller.addItem));

router.put('/edit/:id', middle_verifyToken, middle_authorize("publisher", "admin"), main_Validate.validator(), asyncHandler(main_Controller.editItem));

router.delete('/delete/:id', middle_verifyToken, middle_authorize("publisher", "admin"), asyncHandler(main_Controller.deleteItem));

module.exports = router;
