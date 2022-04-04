const fs = require("fs");
const csv = require("csv-parser");
const Product = require("../models/product");

exports.readCsv = async (req, res) => {
	console.log("x");
	try {
		const filename = req.file.originalname;
		const csvpath = __dirname + "./../uploads/" + filename;
		try {
			var rs = fs.createReadStream(csvpath).pipe(csv());
			rs.on("error", (err) => console.log("error " + err));
			await rs.on("data", async (data) => {
				try {
					let x = {
						productId: data.ProductId,
						name: data.Name,
						stock: data.Stock,
					};
					if (x.productId) {
						try {
							const updatedproduct =
								await Product.findByIdAndUpdate(x.productId, {
									stock: x.stock,
								});
							// console.log(updatedproduct);
						} catch (error) {
							console.log(error.message);
						}
					}
				} catch (err) {
					console.log(err);
					return res.status(400).json({ error: err.message });
				}
			});
			await fs.unlink(csvpath, function (err) {
				if (err) throw err;
				// if no error, file has been deleted successfully
				// console.log("File deleted!");
			});
			return res.status(200).json("Stocks updated");
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({ error: "Srver error" });
	}
};