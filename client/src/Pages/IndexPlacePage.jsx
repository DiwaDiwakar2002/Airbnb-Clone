import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../Components/BookingWidget";

const IndexPlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    try {
      const fetchPlaceData = async () => {
        const { data } = await axios.get("/places/" + id);
        setPlace(data);
      };
      fetchPlaceData();
    } catch (error) {
      console.error("error fetching place data for IndexPlacePage", error);
    }
  }, [id]);

  if (showAllPhotos) {
    return (
      <section className="absolute inset-0 bg-black min-h-screen">
        <div className="p-8 grid gap-5 bg-black">
          <div>
            <button
              className="flex items-center px-5 py-1 top-32 left-12 text-white bg-transparent border-white border rounded-md fixed"
              onClick={() => setShowAllPhotos(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-8 -ms-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </div>
          <h1 className="text-3xl text-white">Photos of {place.title}</h1>
          {place?.photos?.length > 0 &&
            place.photos.map((value, index) => (
              <div key={index} className="">
                <img
                  src={"http://localhost:3001/uploads/" + value}
                  alt="image"
                  className="w-full object-cover"
                />
              </div>
            ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-4 bg-gray-100 -mx-8 p-8">
      <h1 className="font-medium text-2xl">{place.title}</h1>
      <a
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
        className="underline flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
            clipRule="evenodd"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative h-50">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden mt-8">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  src={"http://localhost:3001/uploads/" + place.photos[0]}
                  alt="image1"
                  className="aspect-square object-cover"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <div>
                <img
                  src={"http://localhost:3001/uploads/" + place.photos[1]}
                  alt="image2"
                  className="aspect-square object-cover"
                />
              </div>
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <div>
                  <img
                    src={"http://localhost:3001/uploads/" + place.photos[2]}
                    alt="image3"
                    className="aspect-square object-cover relative top-2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-2 right-2 px-4 py-2 flex rounded-lg gap-2"
          onClick={() => setShowAllPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 -ms-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Show all photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
        <div>
          <div className="mt-8">
            <h2 className="font-semibold text-2xl mb-3">Description</h2>
            {place.description}
          </div>
          <div className="mt-3">
            <h3 className="font-semibold">Check-in: {place.checkIn}</h3>
            <h3 className="font-semibold">Check-out: {place.checkOut}</h3>
            <h3 className="font-semibold">
              Max number of guests: {place.maxGuest}
            </h3>
          </div>
          <div>
            <div className="mt-8">
              <h2 className="font-semibold text-2xl mb-3">Extra info</h2>
              <p className="text-gray-700">{place.extraInfo}</p>
            </div>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
    </section>
  );
};

export default IndexPlacePage;
