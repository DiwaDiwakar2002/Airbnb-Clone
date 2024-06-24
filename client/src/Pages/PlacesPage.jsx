import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    try {
      const fetchPlaceData = async () => {
        const { data } = await axios.get("/user-places");
        setPlaces(data);
      };
      fetchPlaceData();
    } catch (error) {
      console.error("error fetching place data", error);
    }
  }, []);
  return (
    <section>
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
      <div className="mt-4">
        {places.length > 0 &&
          places.map((value, index) => (
            <Link
              to={"/account/places/" + value._id}
              key={index}
              className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-lg"
            >
              <div className="flex h-32 w-32 shrink-0">
                {value.photos.length > 0 && (
                  <img
                    src={"http://localhost:3001/uploads/" + value.photos[0]}
                    alt="thumbnail"
                    className="object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl">{value.title}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  {value.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default PlacesPage;
