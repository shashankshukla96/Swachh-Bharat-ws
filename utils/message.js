const message = {};

message.sendMessage = (res, data, err, msg, status) => {
    if (err) {
        return res.status(200).json({
            response: {
                text: err.message || "Something Went Wrong",
                status: err.status || 500,
            },
        });
    }

    return res.status(200).json({
        response: {
            text: msg || "Success",
            status: status || 200,
            data: data,
        },
    });
};

module.exports = message;
