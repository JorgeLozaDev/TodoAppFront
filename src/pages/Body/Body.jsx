import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";

const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signin" element={<Register />} />
    </Routes>
  );
};

export default Body;
