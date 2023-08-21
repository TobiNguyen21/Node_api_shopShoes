const main_Service = require('../services/category');

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
    getProducts: async (req, res, next) => {
        const data = await main_Service.listItems({ 'id': req.params.id, 'query': req.query }, { 'task': 'get-products' });
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
    eventItem: async (req, res, next) => {
        const data = await main_Service.eventItem({ 'id': req.params.id, 'type': req.params.type });
        if (!data) return res.status(200).json({ success: true, data: "No data" });
        res.status(200).json({
            success: true,
            data: data
        })
    },
    deleteItem: async (req, res, next) => {
        const data = await main_Service.deleteItem({ 'id': req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data: data
        })
    }
}