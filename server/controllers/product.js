const mongoose =  require('mongoose')
const Product = require("../models/product");
const Category = require("../models/category");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { redisClient } = require('./../assets/redis')

// @desc Get Product By ID
// @route GET /api/product/:productId
// @access Public
exports.getSearchedProducts = async (req, res) => {

    const title = req.params.title;
    
    const searchedProds = await Product.find({
      	name: { $regex: new RegExp(title) },
    });

	//   console.log(searchedProds.length);
	if (searchedProds.length>0) {
		return res.json(searchedProds);
	} 
	else {
		return res.json({
			error: "No searched products found",
		});
	}
};

// @desc Get Product By ID
// @route GET /api/product/:productId
// @access Public
exports.getProductById = async (req, res, next, id) => {
	try {
		const product = await (await Product.findById(id)).populate("category");

		if (product) {
			req.product = product;
		} else {
		return res.status(400).json({
			error: "Not found product by ID",
		});
		}

		// It will go to next function with product info in req.product
		next();
	} catch (error) {
		return res.status(400).json({
		error: "Product not found",
		});
	}
};

// @desc Get Product By Name
// @route GET /api/product/:productName
// @access Public
exports.getProductByName = async (req, res, next, name) => {
  try {
    const product = await Product.findOne({ name: name });

    if (product) {
      req.product = product;
    } else {
      return res.status(400).json({
        error: "Not found product by name",
      });
    }

    // It will go to next function with product info in req.product
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Error in finding product",
    });
  }
};

// @desc Get All Products
// @route GET /api/products
// @access Public
exports.getAllProducts = async (req, res) => {

	var data;
    await redisClient.get(`allproducts?${req.query.limit}`,(err, redisdata) => {
        if (err) throw err;
        data = redisdata
    });
    
    if (data != null) {
        return res.json({products: JSON.parse(data)})
    }else {
		try {
			let limit = req.query.limit ? parseInt(req.query.limit) : 100;
			let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
	
			const products = await Product.find()
											.populate("category")
											.select("-photo")
											.sort([[sortBy, "asc"]])
											.limit(limit);
	
			if (products) {
                await redisClient.set(`allproducts?${req.query.limit}`, JSON.stringify(products))
				return res.json({ products: products });
			}
		} catch (error) {
			return res.status(400).json({ error: "No products found" });
		}
	}
};

// @desc Get a Product
// @access Public
exports.getProduct = async(req, res) => {
    
	try {
        
		const param = req.params.product;

		var product = await Product.findOne({ name: param });

		if (product) {
            return res.status(200).json(product);
        }

        if (product === null && mongoose.isValidObjectId(param)) {
            
			product = await Product.findOne({ _id: param });

            if (product) {
                return res.json(product);
            }

            return res.json({
                error: "404 Not Found",
            });
        }

        return res.json({
            error: "404 Not Found",
        });
    } catch (error) {
        console.log(error);

        return res.json({
            error: "Server Error",
        });
    }
};

// @desc Get Products By Category
// @route GET /api/products/:categoryName
// @access Public
exports.getAllProductsByCategory = async (req, res) => {
  try {
    let categoryId = req.category
      ? req.category.id
      : "619cb6bddafcf9142ec6f52a";

    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );
    // .select('photo')
    // .sort([[sortBy, 'asc']])
    // .limit(limit);

    if (products) {
      return res.json(products);
    }
  } catch (error) {
    return res.status(400).json({
      error: "No products found",
    });
  }
};

// @desc Get all Categories (Min. 1 Product)
// @route GET /api/products/all/categories
// @access Public
exports.getAllUniqueCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    if (categories) {
      return res.json(categories);
    }
  } catch (error) {
    return res.status(400).json({
      error: "No Category Found",
    });
  }
};

// @desc Create a Product
// @route POST /api/offer/all
// @access Admin
exports.createProduct = async (req, res) => {
	try {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;

		form.parse(req, async (err, fields, file) => {
		// console.log(err,fields,file);

		if (err) {
			return res.status(400).json({
			error: "Problem with image",
			});
		}

		const { name, description, price, category, stock, photoUrl } = fields;

		if (!name) {
			return res.status(400).json({
			error: "Name field is empty !",
			});
		}

		if (!description) {
			return res.status(400).json({
			error: "Description field is empty !",
			});
		}

		if (!price) {
			return res.status(400).json({
			error: "Price field is empty !",
			});
		}

		if (!category) {
			return res.status(400).json({
			error: "Category field is empty !",
			});
		}

		if (!stock) {
			return res.status(400).json({
			error: "Stock field is empty !",
			});
		}

		const categoryObject = await Category.findOne({ name: fields.category });

		if (!categoryObject) {
			return res.status(400).json({
			error: `${fields.category} Catgeory does not exists !`,
			});
		}

		const updatedFields = {
			name: fields.name,
			description: fields.description,
			price: fields.price,
			category: categoryObject._id,
			stock: fields.stock,
			photoUrl: fields.photoUrl,
		};

		let product = new Product(updatedFields);

		// handle file
		if (file.photo) {
			if (file.photo.size > 3000000) {
			return res.status(400).json({
				error: "File size too big",
			});
			}

			// formidable - V1
			// product.photo.data = fs.readFileSync(file.photo.path);
			// product.photo.contentType = file.photo.type;

			// formidable - V2
			product.photo.data = fs.readFileSync(file.photo.filepath);
			product.photo.contentType = file.photo.mimetype;
		}

		// save to DB
		const productCreated = await product.save();

		if (productCreated) {
			const products = await Product.find()
			redisClient.set('allproducts', JSON.stringify(products))
			res.json(productCreated);
		}
		});
	} catch (error) {
			res.status(400).json({
			error: "Saving Failed",
		});
	}
};

// @desc Update a Product
// @route PUT /api/product/:productId/:userId
// @access ADMIN
exports.updateProduct = async (req, res) => {

    try {

        const _id = req.params.productId

        const productUpdated = await Product.findByIdAndUpdate(
            {_id: _id},
            {$set: req.body},
            {new:true, useFindAndModify:false},
        );

        if (productUpdated) {
            return res.status(200).json({
                message: "Product Updated Successfully ...",
                product: productUpdated
            })
        }

        else {
            return res.status(500).json({error: "No product found by given Id"});
        }

    } catch (error) {
        console.log(error.message);
        return res.json({
            error: "Unable to update the product"
        })
    }
}

// @desc Delete a Product
// @route DELETE /api/offer/all
// @access Admin
exports.deleteProduct = async (req, res) => {
    
	try {

		const _id = req.params.productId;

		const product = await Product.findById(_id)

		const deletedProduct = await product.remove();

		if (deletedProduct) {
			const products = await Product.find()
			redisClient.set('allproducts', JSON.stringify(products))
			return res.status(204).json({ message: `Successfully Deleted ${deletedProduct.name} Product` });
		}

    } catch (error) {
      
		return res.status(400).json({
			error: `Failed to delete this product`,
		});
    }
};
