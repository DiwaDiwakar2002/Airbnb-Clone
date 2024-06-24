import React from "react";
import { Link } from "react-router-dom";

const PlacesPage = () => {

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
    </section>
  );
};

export default PlacesPage;
