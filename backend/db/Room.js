const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        desc: {
            type: String,
            require: true,
        },

        maxPoeple: {
            type: Number,
            require: true,
        },
        roomNumbers: [
            {
                number: Number,
                unavailableDates: { type: [Date] },
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Room", RoomSchema)