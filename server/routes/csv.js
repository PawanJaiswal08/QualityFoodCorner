const express = require("express");
const router = express.Router();
const multer = require("multer");
const { readCsv } = require("./../controllers/csv");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post("/csv", upload.single("productsCsv"), readCsv);

module.exports = router;