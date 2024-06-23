const User = require("../Models/user.model.js")
const Place = require("../Models/place.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const imageDownloader = require("image-downloader")
const path = require("path")
const fs = require("fs")

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "c49w84d9c84w9dc8wdc7"

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const isValid = bcrypt.compareSync(password, user.password)
            if (isValid) {
                jwt.sign({
                    email: user.email,
                    id: user._id,
                    name: user.name
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err
                    res.cookie("token", token).json(user)
                })
            } else {
                res.status(422).json("password not ok")
            }
        } else {
            res.status(404).json("not found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserInfo = async (req, res) => {
    try {
        const { token } = req.cookies
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, user) => {
                if (err) throw err
                res.status(200).json(user)
            })
        } else {
            res.status(401).json("Unauthorized")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// logout

const userLogOut = async (req, res) => {
    try {
        await res.cookie('token', '').json(true)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// upload photo
const uploadPhoto = async (req, res) => {
    try {
        const { link } = req.body
        const newName = "photo" + Date.now() + ".jpg"
        const dest = path.join(__dirname, "../uploads", newName)

        await imageDownloader.image({
            url: link,
            dest: dest
        })

        res.status(200).json(newName)
    } catch (error) {
        console.error("Error downloading image:", error)
        res.status(500).json({ message: error.message })
    }
}

// upload files
const uploadFile = async (req, res) => {
    try {
        const uploadedFiles = []
        for (let i = 0; i < req.files.length; i++) {
            const {path, originalname} = req.files[i]
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = path + '.' + ext
            fs.renameSync(path, newPath)
            uploadedFiles.push(newPath.replace('uploads\\', ''))
        }
        res.status(200).json(uploadedFiles)
    } catch (error) {
        console.error("Error uploading image:", error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createUser,
    getUser,
    createUserLogin,
    getUserInfo,
    userLogOut,
    uploadPhoto,
    uploadFile
}