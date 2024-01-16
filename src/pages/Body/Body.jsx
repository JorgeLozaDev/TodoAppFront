import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";

const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Body;
