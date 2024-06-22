import React, { useContext } from "react";
import { Context } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const { user, ready } = useContext(Context);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "px-3 py-2";
    if (subpage == type) {
      return (classes += "  bg-primary text-white rounded-full");
    } else {
      return classes;
    }
  }
  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage == "profile" && (
        <div className="flex mx-auto">
          Logged in as {user.name} ({user.email})
          <button className="bg-primary text-white rounded-full px-4 py-1">Logout</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
