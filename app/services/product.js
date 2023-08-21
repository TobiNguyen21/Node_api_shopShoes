const MainModel = require('../models/product');

module.exports = {
    listItems: async (params, option) => {
        // Find
        let queryFind = { ...params };
        ['select', 'sort', 'page', 'limit'].forEach(param => delete queryFind[param]);
        let queryStr = JSON.stringify(queryFind);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);
        const find = JSON.parse(queryStr);
        // .Find

        // Select
        const select = (params.select) ? params.select.split(',').join(' ') : '';
        // .Select

        // Sort
        const sort = (params.sort) ? params.sort.split(',').join(' ') : '';
        // .Sort

        // Pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || null;
        const skip = (page - 1) * limit;
        // .Pagination

        if (option.task == 'all') {
            return await MainModel
                .find(find)
                .select(select)
                .sort(sort).skip(skip).limit(limit);
        }
        if (option.task == 'one') {
            return await MainModel
                .findById(params.id)
                .select({})
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
        const number = (type == 'like') ? 1 : -1;
        return await MainModel.findByIdAndUpdate(params.id, { $inc: { like: number } }, { new: true });
    }
}