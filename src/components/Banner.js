import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  appBar: {
     transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:"midnightblue",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`, // Also made this clientWidth
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor:"midnightblue",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "&:focus": {
      color: "#3f51b5",
      backgroundColor: "lightblue",
    },
    "&:hover": {
      color: "#3f51b5",
      backgroundColor: "lightblue",
    },
  },
  hide: {
    display: 'none',
  },
  }));

const Banner = (props) => {
  const {open, handleDrawerOpen} = props;
  const classes = useStyles();

  return (
    <>
     <AppBar 
        role="banner"
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
        <Toolbar>
          <Tooltip title="Open option selection">
            <IconButton
              color="inherit"
              aria-label="open option selection"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography tabIndex="0" variant="h6" component="h1">
            Gridded NCEI Normals Mapper
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Banner;