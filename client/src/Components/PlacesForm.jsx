import axios from "axios";
import React, { useEffect, useState } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
  const { id } = useParams();
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
  const [redirect, setRedirect] = useState(false);

  const placeHandleChange = (e) => {
    const { name, value } = e.target;
    setPlaceData({ ...placeData, [name]: value });
  };

  const handleSave = async (e) => {
    const placeFormData = {
      ...placeData,
      photos: addedPhotos,
      perks,
    };
    e.preventDefault();
    if (id) {
      // update
      try {
        await axios.put("/places", {
          id,
          ...placeFormData,
        });
        setRedirect(true);
      } catch (error) {
        console.error("Error in updating place", error);
      }
    } else {
      // create
      try {
        await axios.post("/places", placeFormData);
        setRedirect(true);
      } catch (error) {
        console.error("Error in adding new place", error);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchFormData = async () => {
      try {
        const { data } = await axios.get(`/places/${id}`);
        setPlaceData({
          title: data.title,
          address: data.address,
          description: data.description,
          extraInfo: data.extraInfo,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          maxGuest: data.maxGuest,
        });
        setAddedPhotos(data.photos);
        setPerks(data.perks);
      } catch (error) {
        console.error("Error in fetching data for form", error);
      }
    };
    fetchFormData();
  }, [id]);

  return (
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
          Title for your place. It should be catchy as an advertisement.
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
        <textarea
          name="description"
          onChange={placeHandleChange}
          value={placeData.description}
        />
        <p className="text-sm text-gray-500">Description about the place</p>
        {/* perks */}
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-sm text-gray-500">Select perks</p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {/* Extra Info */}
        <h2 className="text-2xl mt-4">Extra Information</h2>
        <p className="text-sm text-gray-500">House rules, etc.,</p>
        <textarea
          name="extraInfo"
          onChange={placeHandleChange}
          value={placeData.extraInfo}
        />
        {/* Check in and out time */}
        <h2 className="text-2xl mt-4">Check in & out time</h2>
        <p className="text-sm text-gray-500">
          Enter check-in and check-out time
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="">
            <h3 className="mt-2 -mb-1">Check In time</h3>
            <input
              type="text"
              placeholder="14"
              name="checkIn"
              onChange={placeHandleChange}
              value={placeData.checkIn}
            />
          </div>
          <div className="">
            <h3 className="mt-2 -mb-1">Check Out time</h3>
            <input
              type="text"
              placeholder="6"
              name="checkOut"
              onChange={placeHandleChange}
              value={placeData.checkOut}
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
