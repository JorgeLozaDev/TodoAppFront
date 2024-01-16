import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";

const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default Body;
