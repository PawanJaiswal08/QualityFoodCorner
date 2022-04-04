const Store = require('../models/store');

// @desc Get All Stores
// @route GET /api/stores
// @access Public
exports.getAllStores = async (req, res, next) => {

    try {

        const stores = await Store.find();

        return res.status(200).json({
            success: true,
            // count: stores.length,
            stores: stores
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getStoreById = async (req, res, next, id) => {
    
    try {

        const store = await Store.findById(id);

        if (store) {
            req.store = store
        } else {
            return res.status(400).json({
              error: 'No Store Found !!',
            });
        }

        next()
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// @desc Create a Store
// @route POST /api/create/store/:userId
// @access Admin
exports.createStore = async (req, res) => {

    try {

        const store = new Store(req.body);

        const storeRegistered = await store.save();

        if (storeRegistered) {
            return res.status(201).json({
                success: true,
                data: store
            });
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// @desc Update a Store
// @route PUT /api/create/store/:userId
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
            return res.status(200).json({
                message: "Store Details Updated Successfully ...",
                store: storeUpdated
            })
        }

        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {
        
        console.error(error);
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// @desc Update a Store
// @route PUT /api/create/store/:userId
// @access Admin
exports.deleteStore = async (req, res) => {

    try {

        const store = req.store
 
        const deletedStore = await store.remove();

        if (deletedStore) {
            return res.json({
                message: `Successfully Deleted Store`
            })
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {

        console.error(error);
        
        return res.status(400).json({
            error: 'Failed to delete this category'
        })
    }
}