import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const BootstrapButton = styled(Button)({
    border: "1px solid",
    color: "#000",
    lineHeight: 1.5,
    backgroundColor: "#fff",
    borderColor: "#000",
    boxShadow: "4px 7px 0px 0px #000000",
    "&:hover": {
      boxShadow: "3px 3px 1px #000",
    },
  });
  const navigate = useNavigate()
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <BootstrapButton onClick={()=>(navigate("/signin"))}>Sign In</BootstrapButton>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

export default Home;
