const express = require("express")
const {
    createRoom,
    deleteRoom,
    getAllRoom,
    getRoom,
    updateRoom,
    updateRoomAvailability
} = require("../control/room")
const { verifyAdmin} = require("../middleware/Token")

const router = express.Router()

// Create
router.post("/:hotelid", verifyAdmin, createRoom)

// Update
router.put("/:id", verifyAdmin, updateRoom)

// Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

// Get
router.get("/:id", getRoom)

// Get All
router.get("/", getAllRoom)

// Update Room Date
router.put("/availability/:id", updateRoomAvailability)

module.exports = router;