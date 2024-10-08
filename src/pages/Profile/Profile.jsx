import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/helpers";
import { userDetails } from "../userSlice";
import { ProfileData } from "./components/ProfileData/ProfileData";
import { TodoList } from "./components/Todo/TodoList/TodoList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const Profile = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (token.credentials === "" || isTokenExpired(token.credentials)) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (location.state?.activeTab !== undefined) {
      setValue(location.state.activeTab); // Cambiar a la pestaña "TO DOS"
    }
  }, [location.state]);

  return (
    <Container component="main" maxWidth="lg" >
      <Typography variant="h4" gutterBottom>
        Perfil
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          // height: "50vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs menu"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Personal Info" {...a11yProps(0)} />
          <Tab label="TO DOS" {...a11yProps(1)} />
          <Tab label="Log out" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileData userData={token.credentials} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TodoList userData={token.credentials}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Orders
        </TabPanel>
      </Box>
    </Container>
  );
};
