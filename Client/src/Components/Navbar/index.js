import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import DesktopNav from './desktop-navigation';
import MobileNavigation from './mobile-nav';

const pages = [{title: 'Dashboard', route: 'dashboard'}, {title: 'About', route: 'About'}];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { logoutUser, user } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  /** opens user menu */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /** closes user menu */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const currentPath=window.location.pathname;

  /** handles logout */
  function handleLogout() {
    logoutUser();
    navigate('/');
  }
  return (
    <>
      <AppBar position="relative" sx={{background: '#3d3d3d', color: '#fff'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/** visible in all screen except extra small screen */}
            <DesktopNav pages={pages} />
            {/** visible in extra small screen */}
            <MobileNavigation pages={pages} />
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
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
