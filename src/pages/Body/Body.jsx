import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import { Profile } from "../Profile/Profile";

const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Body;
