const express = require("express")
const { deleteUser, getAllUser, getUser, updateUser } = require("../control/user")
const { verifyAdmin, verifyToken, verifyUser } = require("../middleware/Token")

const router = express.Router()

// Update
router.put("/:id", verifyUser, updateUser)

// Delete
router.delete("/:id", verifyUser, deleteUser)

// Get
router.get("/:id", verifyUser, getUser)

// Get All
router.get("/", verifyAdmin, getAllUser)

module.exports = router;