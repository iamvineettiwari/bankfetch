const { Router } = require("express");

const allBranchesHandler = require("../controller/branches/allBranches");
const autoCompleteHandler = require("../controller/branches/autoComplete");

const router = Router();

router.get("/", allBranchesHandler);
router.get("/autocomplete", autoCompleteHandler);

module.exports = router;
