var express = require("express");
const collectorModel = require("../models/collector");
const message = require("../utils/message");
var router = express.Router();

/* GET users listing. */
router.post("/login", async (req, res, next) => {
    try {
        const collector = await collectorModel.findOne({
            id: req.body.id,
        });

        if (collector) {
            if (collector.password === req.body.password)
                return message.sendMessage(res, collector);
            else
                return message.sendMessage(
                    res,
                    null,
                    null,
                    "Invalid Password !",
                    401
                );
        } else {
            return message.sendMessage(
                res,
				null,
				null,
                "User ID Doesn't Exists",
                401
            );
        }
    } catch (err) {
        message.sendMessage(res, {}, err);
    }
});

module.exports = router;
