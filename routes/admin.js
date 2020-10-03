var express = require("express");
const message = require("../utils/message");
const collectorModel = require("../models/collector");
const supervisorModel = require("../models/supervisor");
const reportModel = require("../models/reports");
const { Types } = require("mongoose");
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

router.post("/supervisor", async (req, res, next) => {
    try {
        const data = req.body;
        data.create_date = new Date().getTime();
        data.update_date = new Date().getTime();

        const length = await supervisorModel.find();
        data.id = length.length + 1;
        const supervisor = await supervisorModel.create(data);

        message.sendMessage(res, supervisor);
    } catch (err) {
        message.sendMessage(res, {}, err);
    }
});

router.get("/reports", async (req, res, next) => {
    try {
        const reports = await reportModel.find().sort({ create_date: -1 });
        return message.sendMessage(res, reports);
    } catch (err) {
        return message.sendMessage(res, {}, err);
    }
});

router.put("/assign", async (req, res, next) => {
    try {
        const reportId = req.body.reportId;
        const supervisor_id = req.body.supervisor_id;

        const supervisor = await supervisorModel.findOne({
            id: supervisor_id,
        });

        const updation = await reportModel.updateOne(
            {
                _id: Types.ObjectId(reportId),
            },
            {
                $set: {
                    supervisor_id: supervisor_id,
                    supervisor_name: supervisor.name,
                    supervisor_assign_date: new Date().getTime(),
                    supervisor_activity: []
                },
            }
        );

        return message.sendMessage(res, updation)
    } catch (err) {
        return message.sendMessage(res, {}, err);
    }
});
module.exports = router;
