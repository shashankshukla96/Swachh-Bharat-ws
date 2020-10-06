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
        const imgHouse = data.house.split(",")[1];
        const imgWaste = data.waste.split(",")[1];
        const idHouse = makeid(6);
        const idWaste = makeid(6);

        base64
            .decode(imgHouse, {
                fname: "./public/images/reports/" + idHouse,
                ext: "png",
            })
            .then((data1) => {
                base64
                    .decode(imgWaste, {
                        fname: "./public/images/reports/" + idWaste,
                        ext: "png",
                    })
                    .then(async (data2) => {
                        data.home_picture =
                            "images/reports/" + idHouse + ".png";
                        data.waste_picture =
                            "images/reports/" + idWaste + ".png";
                        await reportModel.create(data);
                        message.sendMessage(
                            res,
                            null,
                            null,
                            "Report Added !",
                            200
                        );
                    });
            });
    } catch (err) {
        message.sendMessage(res, {}, err);
    }
});

router.post("/reports/date/:id", async (req, res, next) => {
    try {
        const reports = await reportModel.find({
            collector_id: req.params.id,
            collection_date: req.body.date,
        });
        message.sendMessage(res, reports, null, "Reports Found !", 200);
    } catch (err) {
        console.log(err);
        message.sendMessage(res, {}, err);
    }
});


router.put("/:id", async (req, res) => {
    try {
        await collectorModel.updateOne(
            {
                id: req.params.id,
            },
            {
                $set: req.body,
            }
        );

        const supervisor = await collectorModel.findOne({
            id: req.params.id,
        });

        return message.sendMessage(res, supervisor);
    } catch (err) {
        return message.sendMessage(res, {}, err);
    }
});

module.exports = router;
