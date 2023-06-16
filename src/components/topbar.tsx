import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../hooks/useAuth';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';

export default function TopBar({title}:{title:string}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        
        <Typography 
          variant="h6" component="div" sx={{ flexGrow: 1,cursor:"pointer" }}
          onClick={() => navigate(window.location.pathname)}  
        >
          {title}
        </Typography>  
        <div>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            {user?.name}
        </Typography> 
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => logout()}>Cerrar Sesión</MenuItem>
            {location.pathname !== "/" && <MenuItem onClick={() => navigate("/")}>Inicio</MenuItem>}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
