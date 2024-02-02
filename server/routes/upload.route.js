const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Specify your upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
});

const upload = multer({ storage });

router.post("/", upload.array("file", 5), (req, res) => {
    // Access uploaded files using req.files
    console.log("body", req.body);  // Log the request body
    console.log("files" , req.files);

    const fileNames = req.files.map((file) => file.filename);
    res.json({ fileNames });
});


module.exports = router;
