import axios from "axios";
import React, { useState } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import { Navigate } from "react-router-dom";

const PlacesForm = () => {
  const [placeData, setPlaceData] = useState({
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuest: 1,
  });
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false)

  const placeHandleChange = (e) => {
    const { name, value } = e.target;
    setPlaceData({ ...placeData, [name]: value });
  };

  const handleAddNewPlace = (e) => {
    e.preventDefault();
    try {
      const placeFormData = {
        ...placeData,
        photos: addedPhotos,
        perks,
      };
      axios.post("/places", placeFormData);
      setRedirect(true)
    } catch (error) {
      console.error("Error in adding new place", error);
    }
  };

  if(redirect){
    return <Navigate to={'/account/places'} />
  }
  return (
    <div className="">
      <form onSubmit={handleAddNewPlace}>
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
        {/* photo uploader component */}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        {/* description */}
        <h2 className="text-2xl mt-4">Description</h2>
        <textarea name="description" onChange={placeHandleChange} />
        <p className="text-sm text-gray-500">Description about place</p>
        {/* perks */}
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-sm text-gray-500">Select perks</p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
          <Perks selected={perks} onChange={setPerks} />
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
  );
};

export default PlacesForm;
