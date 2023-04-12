const express = require("express");
const { 
countByCity,
countByType,
createHotel,
deleteHotel,
getAllHotel,
getHotel,
getHotelRooms,
updateHotel
} = require("../control/hotel")
const { verifyAdmin } = require("../middleware/Token")

const router = express.Router()

// Create 
router.post("/", verifyAdmin, createHotel)

// Update
router.put("/:id", verifyAdmin, updateHotel)

// Delete
router.delete("/:id", verifyAdmin, deleteHotel)

// Get Hotel
router.get("/find/:id", getHotel)

// Get all 
router.get("/", getAllHotel)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

module.exports = router;