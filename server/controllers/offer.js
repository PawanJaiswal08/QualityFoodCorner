const Offer = require('../models/offer');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { uploadFile } = require('./../assets/s3')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)
const { redisClient } = require('./../assets/redis')

// @desc Get All Offers
// @route GET /api/offer/all
// @access Public
exports.getAllOffers = async (req, res) => {

    const data = await redisClient.get('alloffer')
    
    if (data != null) {
        return res.json({offers: JSON.parse(data)})
    } else {
        try {
            // const offers = await Offer.find({}, { name: 1, feature: 1, isActive: 1 });
            const offers = await Offer.find();
            if(offers){
                await redisClient.set('alloffers', JSON.stringify(offers))
                return res.status(200).json({ offers: offers })
            }
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

// @desc Create a Offer
// @route POST /api/offer/:userId
// @access Admin
exports.createOffer = async (req, res) => {
    try {
        const { name, feature1, feature2, feature3, isActive } = req.body;
        const feature = [];
        if (!feature1 && !feature2 && !feature3) {
            throw new Error('Feature Required');
        }
        if (feature1) {
            feature.push(feature1);
        }
        if (feature2) {
            feature.push(feature2);
        }
        if (feature3) {
            feature.push(feature3);
        }

        const file = req.file;

        // if (file) {
            const result = await uploadFile(file);
            await unlinkFile(file.path);
            const offerImage = result.Location;
        // }

        const offer = await Offer.create({ name, feature, offerImage, isActive });
        
        const offers = await Offer.find()
        redisClient.set('alloffers', JSON.stringify(offers))
        res.status(201).json({ offer: offer })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error })
    }
}

// @desc Update a Offer
// @route POST /api/offer/:offerId/:userId
// @access Admin
exports.updateOffer = async (req, res) => {
    try {
        const { name, feature1, feature2, feature3 } = req.body;
        
        const offer = await Offer.findById(req.params.offerId);

        if (feature1) {
            offer.feature[0] = feature1;
        }
        if (feature2) {
            offer.feature[1] = feature2;
        }
        if (feature3) {
            offer.feature[2] = feature3;
        }

        const file = req.file;

        if (file) {
            const result = await uploadFile(file);
            await unlinkFile(file.path);

            offer.offerImage = result.Location;
        }

        await offer.save();

        res.status(200).json({
            offer: offer
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "Saving Failed",
        });
    }
};


// @desc Delete a Product
// @route DELETE /api/offer/:offerId/:userId
// @access Admin
exports.deleteOffer = async(req, res) => {

    try {

        const offer = Offer.findById(req.params.offerId);

        const deletedOffer = await offer.deleteOne();

        if (deletedOffer) {
            const offers = await Offer.find()
			redisClient.set('alloffers', JSON.stringify(offers))
            return res.json({ message: `Successfully Deleted Offer` });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: `Failed to delete this offer` });
    }
};