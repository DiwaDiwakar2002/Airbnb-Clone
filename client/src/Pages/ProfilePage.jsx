import React, { useContext, useState } from "react";
import { Context } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavBar from "../Components/AccountNavBar";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(Context);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // logout function
  const handleLogout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <section>
      <AccountNavBar />
      {/* my profile page */}
      {subpage == "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button
            className="primary text-white max-w-sm mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* my accommodation page */}
      {subpage == "places" && <PlacesPage />}
    </section>
  );
};

export default ProfilePage;
