import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

const Home = () => {
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
        <Grid
          item
          xs={8}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

export default Home;
