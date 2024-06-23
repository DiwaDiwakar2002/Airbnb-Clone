import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Components/Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [placeData, setPlaceData] = useState({
    title: "",
    address: "",
    photoLink: "",
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuest: 1,
  });
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);

  const placeHandleChange = (e) => {
    const { name, value } = e.target;
    setPlaceData({ ...placeData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: fileName } = await axios.post("/upload-by-link", {
        link: placeData.photoLink,
      });
      setAddedPhotos((prev) => [...prev, fileName]);
      setPlaceData({ ...placeData, photoLink: "" }); // Clear the input field
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
  
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: fileNames } = res;
        setAddedPhotos((prev) => [...prev, ...fileNames]);
      })
      .catch((error) => {
        console.error("Error uploading photos:", error);
      });
  };
  

  return (
    <section>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 my-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {/* add new place */}
      {action == "new" && (
        <div className="">
          <form onSubmit={handleSave}>
            {/* title */}
            <h2 className="text-2xl mt-4">Title</h2>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={placeData.title}
              onChange={placeHandleChange}
            />
            <p className="text-sm text-gray-500">
              Title for your place. it should be catchy as a advertisement
            </p>
            {/* address */}
            <h2 className="text-2xl mt-4">Address</h2>
            <input
              type="text"
              placeholder="address"
              name="address"
              onChange={placeHandleChange}
              value={placeData.address}
            />
            <p className="text-sm text-gray-500">Address to this place</p>
            <h2 className="text-2xl mt-4">Photos</h2>
            {/* photo upload using url */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="add using link...jpg"
                name="photoLink"
                onChange={placeHandleChange}
                value={placeData.photoLink}
              />
              <button
                className="bg-primary text-white rounded-lg text-nowrap px-5"
                onClick={addPhotoByLink}
              >
                Add photo
              </button>
            </div>
            {/* photo upload from device */}
            <p className="text-sm text-gray-500">Add more photos</p>
            <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, index) => (
                  <div key={index} className="h-32 flex">
                    <img
                      srcSet={"http://localhost:3001/uploads/" + link}
                      alt="Hotel-image"
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                ))}
              <label className="h-32 cursor-pointer border text-center border-primary bg-transparent rounded-2xl p-8 text-primary">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  name="addedPhotos"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
            {/* description */}
            <h2 className="text-2xl mt-4">Description</h2>
            <textarea name="description" onChange={placeHandleChange} />
            <p className="text-sm text-gray-500">Description about place</p>
            {/* perks */}
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-sm text-gray-500">Select perks</p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            {/* Extra Info */}
            <h2 className="text-2xl mt-4">Extra Information</h2>
            <p className="text-sm text-gray-500">House rules, etc..,</p>
            <textarea
              name="extraInfo"
              onChange={placeHandleChange}
              value={placeData.extraInfo}
            />
            {/* Check in and out time */}
            <h2 className="text-2xl mt-4">Check in & out time</h2>
            <p className="text-sm text-gray-500">
              Enter check in and check out time
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="">
                <h3 className="mt-2 -mb-1">Check In time</h3>
                <input
                  type="number"
                  placeholder="14"
                  name="chechIn"
                  onChange={placeHandleChange}
                  value={placeData.chechIn}
                />
              </div>
              <div className="">
                <h3 className="mt-2 -mb-1">Check Out time</h3>
                <input
                  type="number"
                  placeholder="6"
                  name="chechOut"
                  onChange={placeHandleChange}
                  value={placeData.chechOut}
                />
              </div>
              <div className="">
                <h3 className="mt-2 -mb-1">Max Guest</h3>
                <input
                  type="number"
                  placeholder="ex: 3"
                  name="maxGuest"
                  onChange={placeHandleChange}
                  value={placeData.maxGuest}
                />
              </div>
            </div>
            <button type="submit" className="primary my-4">
              Save
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default PlacesPage;
