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
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../Store/Selectors/Auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Slices/Auth';

const pages = ['Dashboard', 'About'];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const {isAuthed, user} = useSelector(getAuthState);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const currentPath=window.location.pathname;
  function handleLogout() {
    window.localStorage.removeItem('tokenId');
    dispatch(logout());
    navigate('/');
  }
  return (
    <>
      <AppBar position="relative" sx={{background: '#3d3d3d', color: '#fff'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
              onClick={()=> navigate('/')}
            >
              Todoist
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => {navigate(`/${page}`);handleCloseNavMenu();}}>
                    <Typography textAlign="center" sx={{color: '#727272'}}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {navigate(`/${page}`);handleCloseNavMenu();}}
                  sx={{ my: 2, color: '#fff', display: 'block', fontSize: '0.75rem' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuthed === true? (
                  <>
                      <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src={user.picture} />
                      </IconButton>
                      </Tooltip>
                      <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                      >
                      {settings.map((setting) => (
                          <MenuItem key={setting} onClick={() => {handleCloseUserMenu();if(setting === 'Logout')handleLogout();}}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                      ))}
                      </Menu>
                  </>
              ): (
                <Button
                  onClick={() => navigate(`/login/?onSuccess=${currentPath}`)}
                  sx={{ my: 2, color: '#fff', display: 'block', fontSize: '0.75rem' }}
                >
                  Sign in
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default ResponsiveAppBar;
