const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = Schema({
    collector_id: {
        type: String,
    },
    collector_name: {
        type: String,
    },
    collection_date: {
        type: String,
    },
    reason: {
        type: String,
    },
    home_picture: {
        type: String,
    },
    waste_picture: {
        type: String,
    },
    address: {
        type: String,
    },
    lat: {
        type: String,
    },
    long: {
        type: String,
    },
    locality: {
        type: String,
    },
    sublocality: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    supervisor_id: {
        type: String,
    },
    supervisor_name: {
        type: String,
    },
    supervisor_assign_date: {
        type: Number,
    },
    supervisor_activity: {
        type: [],
    },
    is_resolved: {
        type: Boolean,
        default: false
    }
});

const reportModel = mongoose.model("reports", reportSchema);

module.exports = reportModel;
