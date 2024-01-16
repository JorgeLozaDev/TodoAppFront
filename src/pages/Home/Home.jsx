import { Box, Grid } from "@mui/material";

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
        <Grid item xs={8}>
          <Box
            component="button"
            xs={{
              border: 3,
              borderColor: "common.black",
              borderRadius: 2,
              width: 20,
            }}
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Button Link
          </Box>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

export default Home;
