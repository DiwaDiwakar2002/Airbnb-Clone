import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/places");
      setPlaces([...data, ...data, ...data, ...data, ...data, ...data]);
    };
    fetchData();
  }, []);
  return (
    <section className="mt-12 gap-x-6 gap-y-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((value, index) => (
          <Link key={index} className="cursor-pointer" to={'/place/'+value._id}>
            <div className="rounded-2xl flex">
              {value.photos?.[0] && (
                <img
                  src={"http://localhost:3001/uploads/" + value.photos[0]}
                  alt="thumbnail"
                  className="rounded-2xl aspect-square object-cover"
                />
              )}
            </div>
            <div className="mt-3">
              <h2 className="text-xs font-bold text-gray-800">
                {value.address}
              </h2>
              <p className="text-sm text-gray-500 truncate ">{value.title}</p>
              <h2 className="font-semibold text-gray-800 mt-1">
                <span className="font-bold">₹{value.price}</span> /per night
              </h2>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default IndexPage;
