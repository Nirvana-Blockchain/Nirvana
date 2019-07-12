var express = require("express");
var router = express.Router();
var adminController = require("../controller/AdminApi");

var router = express.Router();
router.post("/addTest", adminController.addTest);
router.post("/uploadTest", adminController.uploadTest);
router.post("/deleteTest", adminController.deleteTest);
router.post("/addExam", adminController.addExam);
router.post("/deleteExam", adminController.deleteExam);
module.exports = router;
