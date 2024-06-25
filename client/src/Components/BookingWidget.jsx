import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Context } from "../UserContext";

const BookingWidget = ({ place }) => {
  const [redirect, setRedirect] = useState("");
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    numberOfGuest: 1,
    name: "",
    email: "",
    phone: "",
  });


  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  var numberOfDays = 0;

  if (bookingData.checkIn && bookingData.checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(bookingData.checkOut),
      new Date(bookingData.checkIn)
    );
  }

    // get user name from login info
    const { user } = useContext(Context);
    
    useEffect(() => {
      if (user) {
        setBookingData(prevData => ({
          ...prevData,
          name: user.name,
          email: user.email,
        }));
      }
    }, [user]);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const datas = {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        numberOfGuest: bookingData.numberOfGuest,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        place: place._id,
        price: place.price * numberOfDays,
      };
      const res = await axios.post("/bookings", datas);
      const bookingId = res.data._id
      setRedirect("/account/bookings/"+bookingId);
    } catch (error) {
      console.error("Error in post data from booking widget");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white shadow-lg p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{place.price} /per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check-in</label>
            <input
              type="date"
              name="checkIn"
              onChange={handleBookingChange}
              value={bookingData.checkIn}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check-out</label>
            <input
              type="date"
              name="checkOut"
              onChange={handleBookingChange}
              value={bookingData.checkOut}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests</label>
          <input
            type="number"
            name="numberOfGuest"
            onChange={handleBookingChange}
            value={bookingData.numberOfGuest}
          />
        </div>
        {numberOfDays > 0 && (
          <>
            <div className="py-3 px-4 border-t">
              <label>Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Your full name"
                onChange={handleBookingChange}
                value={bookingData.name}
              />
            </div>
            <div className="py-3 px-4 border-t">
              <label>Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="name@gmail.com"
                onChange={handleBookingChange}
                value={bookingData.email}
              />
            </div>
            <div className="py-3 px-4 border-t">
              <label>Phone number</label>
              <input
                required
                type="tel"
                name="phone"
                maxLength={13}
                placeholder="+91 9876543210"
                onChange={handleBookingChange}
                value={bookingData.phone}
              />
            </div>
          </>
        )}
      </div>
      <button className="primary font-semibold" onClick={handleBook}>
        Book now
        {numberOfDays > 0 && (
          <span className="font-light">
            {" "}
            (₹{place.price * numberOfDays}/{numberOfDays} days)
          </span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
