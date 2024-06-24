const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createUser, getUser, createUserLogin, getUserInfo, userLogOut, uploadPhoto, uploadFile, addNewPlace, getPlaceData, editPlaceData, updateFormData } = require("../Controller/user.controller");

// Create a multer instance for file uploads
const photoMiddleware = multer({ dest: 'uploads/' });

// User routes
router.post("/register", createUser);
router.post("/login", createUserLogin);
router.get("/register", getUser);
router.get("/profile", getUserInfo);
router.post("/logout", userLogOut);

// Photo upload routes
router.post("/upload-by-link", uploadPhoto);

// File upload routes
router.post("/upload", photoMiddleware.array('photos', 100), uploadFile);

// Storing Add new place form data
router.post("/places", addNewPlace)

// get place data
router.get("/places", getPlaceData)
router.get('/places/:id', editPlaceData)

// update form data
router.put('places', updateFormData)

module.exports = router;
