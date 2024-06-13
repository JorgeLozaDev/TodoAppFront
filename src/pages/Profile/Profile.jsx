import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { userDetails } from "../userSlice";

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
          <Typography>{children}</Typography>
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

  useEffect(() => {
    if (token.credentials === "") {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box
        sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 224 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Personal Info" {...a11yProps(0)} />
          <Tab label="Account Settings" {...a11yProps(1)} />
          <Tab label="Orders" {...a11yProps(2)} />
          <Tab label="Wishlist" {...a11yProps(3)} />
          <Tab label="Security" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Personal Info
        </TabPanel>
        <TabPanel value={value} index={1}>
          Account Settings
        </TabPanel>
        <TabPanel value={value} index={2}>
          Orders
        </TabPanel>
        <TabPanel value={value} index={3}>
          Wishlist
        </TabPanel>
        <TabPanel value={value} index={4}>
          Security
        </TabPanel>
      </Box>
    </Container>
  );
};
