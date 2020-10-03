const mongoose = require("mongoose");
const schema = mongoose.Schema;

const superVisorSchema = schema({
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    password: {
        type: String,
    },
    address: {
        line1: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        },
    },
    status: {
        type: Boolean,
        default: true,
    },
    create_date: {
        type: String,
    },
    update_date: {
        type: String,
    },
});

const supervisorModel = mongoose.model("supervisor", superVisorSchema);

module.exports = supervisorModel;
