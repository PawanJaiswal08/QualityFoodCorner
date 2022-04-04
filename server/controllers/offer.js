const Offer = require('../models/offer');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

// @desc Get All Offers
// @route GET /api/offer/all
// @access Public
exports.getAllOffers = async (req, res) => {
    
    try {
        
        // const offers = await Offer.find({}, { name: 1, feature: 1, isActive: 1 });
        const offers = await Offer.find();

        if(offers){
            return res.status(200).json({
                offers: offers
            })
        }


    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
}

// @desc Create a Offer
// @route POST /api/offer/:userId
// @access Admin
exports.createOffer = async (req, res) => {

    try {

        let form = new formidable.IncomingForm();
        form.keepExtensions = true

        form.parse(req, async (err, fields, file) => {

            // console.log(err,fields,file);
            
            if(err){
                return res.status(400).json({
                    error: "Problem with image"
                });
            }

            const { name, feature1, feature2, feature3, isActive } = fields

            if (!name) {
                return res.status(400).json({
                    error: "Name field is empty !"
                })
            }

            if (!feature1 && !feature2 && !feature3) {
                return res.status(400).json({
                    error: "Feature field is empty !"
                })
            }

            const updatedFields = {
                name: fields.name,
                // feature: fields.feature,
                isActive: fields.isActive,
            }

            let offer = new Offer(updatedFields);

            
            // Features array
            if( feature1 != null){
                offer.feature.push(feature1)
            }

            if( feature2 != null){
                offer.feature.push(feature2)
            }
            
            if( feature3 != null){
                offer.feature.push(feature3)
            }

            // handle file
            if (file.offerImage) {

                if (file.offerImage.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                // formidable - V2
                offer.offerImage.data = fs.readFileSync(file.offerImage.filepath);
                offer.offerImage.contentType = file.offerImage.mimetype;
            }


            // save to DB
            const offerCreated = await offer.save()

            if (offerCreated) {
                return res.status(201).json(offerCreated)
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

// @desc Update a Offer
// @route POST /api/offer/:offerId/:userId
// @access Admin
exports.updateOffer = async(req, res) => {
    try {
        
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, async(err, fields, file) => {

            if (err) {
                return res.status(400).json({
                    error: "Problem with image",
                });
            }            

            // Save to DB
            try {

                const _id = req.params.offerId 
                
                const offer = await Offer.findById(_id);

                if (fields.name) {
                    offer.name = fields.name
                }
                if (fields.feature1) {
                    offer.feature[0] = fields.feature1
                }
                if (fields.feature2) {
                    offer.feature[1] = fields.feature2
                }
                if (fields.feature3) {
                    offer.feature[2] = fields.feature3
                }

                // handle file
                if (file.photo) {

                    if (file.photo.size > 3000000) {
                        return res.status(400).json({
                            error: "File size too big",
                        });
                    }

                    offer.offerImage.data = fs.readFileSync(file.offerImage.filepath);
                    offer.offerImage.contentType = file.offerImage.mimetype;
                }


                const offerUpdated = await offer.save();

                if (offerUpdated) {
                    return res.status(200).json(offerUpdated);
                }

            } catch (error) {
                return res.status(400).json({
                    error: "Updation Failed",
                });
            }
        });
    } catch (error) {
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

        const deletedOffer = await offer.remove();

        if (deletedOffer) {
            return res.json({
                message: `Successfully Deleted Offer`,
            });
        }

    } catch (error) {

        return res.status(400).json({
            error: `Failed to delete this offer`,
        });
    }
};