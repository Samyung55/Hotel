const Room = require("../db/Room");
const Hotel = require("../db/Hotel");
const { createError } = require("../middleware/error");

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    }
    catch (err) {
        next(err)
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const getRoom = async (req, res, next) => {
    try {
        const Room = await Room.findById(req.params.id)
        res.status(200).json(Room)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })  
        }
        catch (err) {
            next(err)
        }
        res.status(500).json(err)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const getAllRoom = async (req, res, next) => {
    try {
        const Rooms = await Room.find()
        res.status(200).json(Rooms)
    }
    catch (err) {
        next(err)
    }
}

const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            { $push: { "roomNumbers.$,unavailableDates": req.body.dates }, }
        )
        res.status(200).json("Room status is updated")
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createRoom,
    deleteRoom,
    getAllRoom,
    getRoom,
    updateRoom,
    updateRoomAvailability
}