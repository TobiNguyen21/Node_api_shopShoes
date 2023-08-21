const MainModel = require('../models/category');
const ProductModel = require('../models/product');

module.exports = {
    listItems: async (params, option) => {
        let id = (params.id) ? params.id : "";
        params = (params.id) ? params.query : params;

        // Find
        let queryFind = { ...params };
        ['select', 'sort', 'page', 'limit'].forEach(param => delete queryFind[param]);
        let queryStr = JSON.stringify(queryFind);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);
        let find = JSON.parse(queryStr);
        // .Find

        // Select
        let select = (params.select) ? params.select.split(',').join(' ') : '';
        // .Select

        // Sort
        let sort = (params.sort) ? params.sort.split(',').join(' ') : '';
        // .Sort

        // Pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || null;
        const skip = (page - 1) * limit;
        // .Pagination

        if (option.task == 'all') {
            return await MainModel
                .find(find)
                .populate({ path: 'product', select: 'name' })
                .select(select)
                .sort(sort).skip(skip).limit(limit);
        }
        if (option.task == 'get-products') {
            if (id != "all") Object.assign(find, { "category.id": id });
            return ProductModel
                .find(find)
                .select(select)
                .sort(sort)
                .skip(skip).limit(limit);
        }
    },
    create: async (item) => {
        return await new MainModel(item).save();
    },
    deleteItem: async (params, option) => {
        if (option.task == 'one') {
            return await MainModel
                .deleteOne({ _id: params.id })
        }
    },
    editItem: async (params, option) => {
        if (option.task == 'edit') {
            return await MainModel
                .updateOne({ _id: params.id }, params.body)
        }
    },
    eventItem: async (params, option) => {
        console.log("params", params);
        const type = params.type;
        if (type != 'like' && type != 'dislike') return;
        return await MainModel.findByIdAndUpdate(params.id, { $inc: { [type]: 1 } }, { new: true });
    }
}