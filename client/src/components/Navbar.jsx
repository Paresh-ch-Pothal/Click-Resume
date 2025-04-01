import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';
import logo from '../assets/logo.png'

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const navigate = useNavigate()
  const visitHome = () => {
    navigate("/home")
  }

  const visitAbout = () => {
    navigate("/about")
  }

  const visitContact = () => {
    navigate("/contact")
  }



  const visitSignup = () => {
    navigate("/signup")
  }

  const visitLogin = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
    window.location.reload()
  }

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #39425a, #2c3e50)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img
            src={logo}
            alt="Logo"
            style={{ display: 'flex', marginRight: '8px', width: 'auto', height: '70px' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.01rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ClickResume
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={visitHome}>
                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
              </MenuItem>
              <MenuItem onClick={visitAbout}>
                <Typography sx={{ textAlign: 'center' }}>About Us</Typography>
              </MenuItem>
              <MenuItem onClick={visitContact}>
                <Typography sx={{ textAlign: 'center' }}>Contact </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.01rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ClickResume
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={visitHome}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button onClick={visitAbout}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              About Us
            </Button>
            <Button onClick={visitContact}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Contact Us
            </Button>
          </Box>
          {!localStorage.getItem("token") ? (
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={visitLogin}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  border: '1px solid white',
                  borderRadius: '5px',
                  marginRight: '15px',
                  padding: '5px 10px',
                  textTransform: 'none',
                }}
              >
                Login
              </Button>
              <Button
                onClick={visitSignup}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  backgroundColor: '#ff9800',
                  borderRadius: '5px',
                  padding: '5px 15px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#e68900',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <div>
              <IconButton onClick={handleClick}>
                <Avatar><PersonIcon /></Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
