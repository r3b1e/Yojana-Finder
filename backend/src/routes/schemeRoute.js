const express = require("express");
const router = express.Router();
const {addSingleEntry, insertFromCsv, test_translate, getDashboardData, getSchemes, getSchemeBySlug, searchSchemes, agricultureSchemes} = require('../controllers/schemeControllers')


router.post("/addscheme", addSingleEntry);
router.get("/insertFromCsv", insertFromCsv);
router.get("/test", test_translate);
router.get("/dashboard", getDashboardData);
router.post("/requestschemes", getSchemes);
router.get("/by/:slug", getSchemeBySlug);
router.get("/search/query", searchSchemes);
router.get("/agriculture", agricultureSchemes);



module.exports = router;