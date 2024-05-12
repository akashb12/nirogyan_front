import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../MyContext';


export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useContext(MyContext);

  const logoutUser = () => {
    dispatch(logout()).then((res)=> {
      if(res.payload.status != 200) {
        console.log(res);
      } else {
        navigate('/login');
      }
    })
  }
  return (
    <Box sx={{ flexGrow: 1,height:'10vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <HealthAndSafetyIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {user.lab_name.toUpperCase()}
          </Typography>
          <div className='nav-logout'>
            <LogoutIcon onClick={logoutUser} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}