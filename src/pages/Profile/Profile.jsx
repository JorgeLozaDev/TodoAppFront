import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";

export const Profile = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography>Profile </Typography>
      </Container>
    </>
  );
};
