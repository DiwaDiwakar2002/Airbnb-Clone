const express = require("express")
const { createUser, getUser, createUserLogin, getUserInfo, userLogOut } = require("../Controller/user.controller")
const router = express.Router()

router.post("/register", createUser)
router.post("/login", createUserLogin)
router.get("/register", getUser)
router.get("/profile", getUserInfo)

// logout
router.post("/logout", userLogOut)


module.exports = router