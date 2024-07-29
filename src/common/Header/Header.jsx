import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userDetails } from "../../pages/userSlice";
import { isTokenExpired } from "../../utils/helpers";

// Define los settings con un identificador único
const settings = [
  { id: "profile", label: "Profile", roles: ["user", "admin"] },
  { id: "adminPanel", label: "Admin Panel", roles: ["admin"] },
  { id: "logout", label: "Logout", roles: ["user", "admin"] },
];

const guestSettings = [
  { id: "signIn", label: "Sign In" },
  { id: "register", label: "Register" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [decode, setDecode] = useState(null);
  const token = useSelector(userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    if (token.credentials == null) {
      setDecode(null);
    } else {
      if (isTokenExpired(token.credentials)) {
        console.log("first");

      } else {
        setDecode(jwtDecode(token.credentials));
      }
    }
  }, [token]);
  

  const handleSettingClick = (settingId) => {
    switch (settingId) {
      case "profile":
        navigate("/profile"); // Navega a la página de perfil
        break;
      case "adminPanel":
        navigate("/admin"); // Navega a la página de admin
        break;
      case "logout":
        dispatch(logout()); // Despacha la acción de logout
        navigate("/"); // Navega a la página de inicio o login después del logout
        break;
      case "signIn":
        navigate("/signin"); // Navega a la página de login
        break;
      case "register":
        navigate("/register"); // Navega a la página de registro
        break;
      default:
        break;
    }
    handleCloseUserMenu(); // Cierra el menú después de la acción
  };

  const userLoggedIn = token.credentials !== null;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir Menú">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={userLoggedIn ? "User Avatar" : "Guest Avatar"}
                  src={
                    userLoggedIn
                      ? "/static/images/avatar/2.jpg"
                      : "/static/images/avatar/default.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userLoggedIn
                ? settings
                    .filter(
                      (setting) => decode && setting.roles.includes(decode.role)
                    )
                    .map((setting) => (
                      <MenuItem
                        key={setting.id}
                        onClick={() => handleSettingClick(setting.id)}
                      >
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ))
                : guestSettings.map((setting) => (
                    <MenuItem
                      key={setting.id}
                      onClick={() => handleSettingClick(setting.id)}
                    >
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
