const { mongoose } = require(".");

module.exports = mongoose => {
    const Event = mongoose.model(
        "event",
        mongoose.Schema(
            {
                name : String,
                location : String,
                date : String,
                description : String
            },
            // {timestamps: true}
        )
    );

    return Event;
};