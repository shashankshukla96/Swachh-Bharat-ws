var express = require("express");
const message = require("../utils/message");
const collectorModel = require("../models/collector");
var router = express.Router();

/* ADD collector. */
router.post("/collector", async (req, res, next) => {
    try {
        const data = req.body;
        data.create_date = new Date().getTime();
        data.update_date = new Date().getTime();

        const collector = await collectorModel.create(data);

        message.sendMessage(res, collector);
    } catch (err) {
        message.sendMessage(res, {}, err);
    }
});

module.exports = router;
