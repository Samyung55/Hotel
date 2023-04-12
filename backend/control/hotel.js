const Hotel = require("../db/Hotel")
const Room = require("../db/Room")

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel deleted")
    } catch {
        res.status(500).json(error)
    }
}

const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllHotel = async (req, res, next) => {
    const { min, max, ...other } = req.query
    try {
        const hotels = await Hotel.find({ ...other, cheapestPrice: { $gt: min || 1, $lt: max || 999 } }).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

const countByType = async (req, res, next) => {
try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" })
    const resortCount = await Hotel.countDocuments({ type: "resort" })
    const villaCount = await Hotel.countDocuments({ type: "villa" })
    const cabinCount = await Hotel.countDocuments({ type: "cabin" })

    res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinCount },
    ])
}
catch (error) {
    next(error)
}
}

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { 
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getAllHotel,
    getHotel,
    getHotelRooms,
    updateHotel 
}