const main_Service = require('../services/product');

const validateReq = require('../utils/validateReq');

module.exports = {
    getListItems: async (req, res, next) => {
        const data = await main_Service.listItems(req.query, { 'task': 'all' })
        if (!data || data.length === 0) return res.status(200).json({ success: true, count: 0, data: 'No data' });
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    },
    getItemById: async (req, res, next) => {
        const data = await main_Service.listItems({ 'id': req.params.id }, { 'task': 'one' })
        if (!data) return res.status(200).json({ success: true, data: 'No data' });
        res.status(200).json({
            success: true,
            data: data
        })
    },
    addItem: async (req, res, next) => {
        const item = req.body || {};
        const err = validateReq(req, res, next);

        if (!err) {
            const data = await main_Service.create(item);
            res.status(201).json({
                success: true,
                data: data
            })
        }
    },
    editItem: async (req, res, next) => {
        const body = req.body || {};
        const err = validateReq(req, res, next);

        if (!err) {
            const data = await main_Service.editItem({ 'id': req.params.id, 'body': body }, { 'task': 'edit' })
            res.status(200).json({
                success: true,
                data: data
            })
        }
    },
    deleteItem: async (req, res, next) => {
        const data = await main_Service.deleteItem({ 'id': req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data: data
        })
    }
}