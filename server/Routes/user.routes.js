const express = require("express")
const { createUser, getUser, createUserLogin, getUserInfo } = require("../Controller/user.controller")
const router = express.Router()

router.post("/register", createUser)
router.post("/login", createUserLogin)
router.get("/register", getUser)
router.get("/profile", getUserInfo)


module.exports = router