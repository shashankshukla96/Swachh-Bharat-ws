var express = require("express");
const base64 = require("node-base64-image");

const collectorModel = require("../models/collector");
const message = require("../utils/message");
const reportModel = require("../models/reports");
var router = express.Router();

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

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

router.post("/report", async (req, res, next) => {
    try {
        const data = req.body;
        const reportData = {
            collector_id: data.collector_id,
            collector_name: data.collector_name,
            collection_date: new Date(),
            reason: data.reason,
            location: data.location,
        };

        const img = data.housePicture.split(",")[1];
        const idHouse = makeid(6);
        const idWaste = makeid(6);

        await base64.decode(img, {
            fname: "./public/images/reports" + idHouse,
            ext: "png",
        });

        await base64.decode(img, {
            fname: "./public/images/reports" + idWaste,
            ext: "png",
        });

        data.homePicture = "images/reports/" + idHouse + ".png";
        data.wastePicture = "images/reports/" + idWaste + ".png";

        await reportModel.create(reportData);
        message.sendMessage(res, null, null, "Report Added !", 200);
    } catch (err) {
        message.sendMessage(res, {}, err);
    }
});

module.exports = router;
