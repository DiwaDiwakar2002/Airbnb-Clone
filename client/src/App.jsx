import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout/Layout";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import UserContext from "./UserContext";
import ProfilePage from "./Pages/ProfilePage";
import PlacesForm from "./Components/PlacesForm";
import IndexPlacePage from "./Pages/IndexPlacePage";
import BookingsPage from "./Pages/BookingsPage";
import SingleBookingPage from "./Pages/SingleBookingPage";

// base url
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContext>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<ProfilePage />} />
            <Route path="/account/:subpage/new" element={<PlacesForm />} />
            <Route path="/account/:subpage/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<IndexPlacePage />} />
            <Route
              path="/account/bookings/:id"
              element={<SingleBookingPage />}
            />
          </Route>
        </Routes>
      </UserContext>
    </>
  );
}

export default App;
