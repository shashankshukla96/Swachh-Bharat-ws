var express = require("express");
const { Types } = require("mongoose");
const reportModel = require("../models/reports");
const supervisorModel = require("../models/supervisor");
const message = require("../utils/message");
var router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const collector = await supervisorModel.findOne({
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

router.post("/reports/:id", async (req, res, next) => {
    try {
        console.log(req.body);
        const reports = await reportModel
            .find({
                supervisor_id: req.params.id,
                supervisor_assign_date: +req.body.date,
            })
            .sort({ collection_date: 1 });

        return message.sendMessage(res, reports);
    } catch (err) {
        return message.sendMessage(res, {}, err);
    }
});

router.put("/resolve/:id", async (req, res, next) => {
    try {
        const response = req.body.response;

        await reportModel.updateOne(
            {
                _id: Types.ObjectId(req.params.id),
            },
            {
                $push: {
                    supervisor_activity: {
                        date: new Date().getTime(),
                        remarks: response,
                    },
                },
                $set: {
                    is_resolved: req.body.is_resolved,
                },
            }
        );

        return message.sendMessage(res, null);
    } catch (err) {
        return message.sendMessage(res, {}, err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        await supervisorModel.updateOne(
            {
                id: req.params.id,
            },
            {
                $set: req.body,
            }
        );

        const supervisor = await supervisorModel.findOne({
            id: req.params.id,
        });

        return message.sendMessage(res, supervisor);
    } catch (err) {
        return message.sendMessage(res, {}, err);
    }
});

module.exports = router;
