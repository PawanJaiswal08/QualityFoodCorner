const Store = require('../models/store');
const { redisClient } = require('./../assets/redis')

// @desc Get a Store By Id
// @param /:storeId
// @access Public
exports.getStoreById = async (req, res, next, id) => {
    try {
        
        const store = await Store.findById(id);
        if (store) {
            req.store = store
        } else {
            return res.status(400).json({ error: 'No Store Found !!' });
        }

        next()
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// @desc Get All Stores
// @route GET /api/stores
// @access Public
exports.getAllStores = async (req, res) => {

    var data;
    await redisClient.get(`allstores`,(err, redisdata) => {
        if (err) throw err;
        data = redisdata
    });
    
    if (data != null) {
        return res.json({stores: JSON.parse(data)})
    } else {
        try {
            const stores = await Store.find();
            if (stores) {
                await redisClient.set('allstores', JSON.stringify(stores))
                return res.status(200).json({ stores: stores });
            }
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

// @desc Create a Store
// @route POST /api/store/:userId
// @access Admin
exports.createStore = async (req, res) => {
    try {
        const store = new Store(req.body);
        const storeRegistered = await store.save();
        if (storeRegistered) {
            const stores = await Store.find()
            await redisClient.set('allstores', JSON.stringify(stores))
            return res.status(201).json({ data: store });
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// @desc Update a Store
// @route PUT /api/store/:storeId/:userId
// @access Admin
exports.updateStore = async (req, res) => {
    try {
        const _id = req.store.id
        const storeUpdated = await Store.findByIdAndUpdate(
            {_id: _id},
            {$set: req.body},
            {new:true, useFindAndModify:false},
        );

        if (storeUpdated) {
            return res.status(200).json({ store: storeUpdated })
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// @desc Update a Store
// @route PUT /api/store/:storeId/:userId
// @access Admin
exports.deleteStore = async (req, res) => {

    try {
        const store = req.store
        const deletedStore = await store.remove();
        if (deletedStore) {
            const stores = await Store.find()
            await redisClient.set('allstores', JSON.stringify(stores))
            return res.json({ message: `Store Deleted Successfully` })
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Failed to delete this category' })
    }
}