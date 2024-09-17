import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { TodoForm } from "../Profile/components/Todo/TodoForm/TodoForm";
import { TodoList } from "../Profile/components/Todo/TodoList/TodoList";

const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/todos/list" element={<TodoList />} />
      <Route path="/profile/todos/form" element={<TodoForm />} />
    </Routes>
  );
};

export default Body;
