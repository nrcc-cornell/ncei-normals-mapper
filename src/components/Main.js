import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Banner from './Banner';
import OptionsSelection from './OptionsSelection';
import GetResults from './GetResults';
import { default_params, default_levels, default_colors, drawerWidth } from '../utilities/constants';
import poweredByAcis from '../images/PoweredbyACIS.gif';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  footerContainer: {
    position: "fixed", 
    width: "calc(100% - " + drawerWidth + "px - 2em)", 
    bottom: 0, 
    marginTop: "1em", 
    borderTop: "1pt solid midnightblue",
    textAlign: "right",
    padding: "0.5em 0",
  },
}));

const Main = () => {
  const classes = useStyles();
  const [viewMap, setViewMap] = useState(false);
  const [inputParams, setInputParams] = useState(default_params);
  const [levels, setLevels] = useState(default_levels);
  const [colors, setColors] = useState(default_colors);
  const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(!smallScreen);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleViewMapClick = () => {
    setViewMap(true);
    if (smallScreen) {
      setOpen(false);
    }
  };

  const updateInputParams = (updateParams) => {
    setViewMap(false);
    const newParams = {...inputParams, ...updateParams}
    setInputParams(newParams);
  }

  const updateLevels = (updateParams) => {
    setLevels({...levels, ...updateParams});
  };

  const updateColors = (updateParams) => {
    setColors({...colors, ...updateParams});
  };

  useEffect(() => {
    // initial useState does not recognize small screen yet; so need to set drawer status here
    setOpen(!smallScreen);
  },[smallScreen]);

  return (
    <>
      <a href="#maincontent" className="skip">Skip to main content</a>

      <Banner
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />

      <nav>
        <OptionsSelection
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleViewMapClick={handleViewMapClick}
          inputParams={inputParams}
          updateInputParams={updateInputParams}
          levels={levels}
          colors={colors}
        />
      </nav>

      <main id="maincontent">
        <div className={classes.drawerHeader}  />
        <div className={clsx(classes.content, { [classes.contentShift]: open, })}>
          <GetResults 
            inputParams = {inputParams}
            updateLevels = {updateLevels}
            viewMap = {viewMap}
            levels = {levels}
            updateColors = {updateColors}
          />
          {!viewMap &&
            <>
              <Typography paragraph>
                Climate Normals are three-decade averages of climatological variables including temperature and precipitation. 
                These normals are updated once every 10 years. The 1991-2020 gridded 
                <a href="https://www.ncei.noaa.gov/products/us-climate-normals" target="_blank" rel="noreferrer"> U.S. climate normals</a> dataset 
                from the <a href="https://www.ncei.noaa.gov/" target="_blank" rel="noreferrer">National Centers for Environmental Information</a> contains daily and monthly normals of temperature (maximum, miminum, average) and precipitation for the conterminous 
                United States.
              </Typography>
                              
              <Typography paragraph>
                To view the data contained in the gridded climate normals dataset, set your desired options in the
                navigation pane and click the "Submit Request" button to view the results. Buttons will be provided below each
                resulting product to allow you to download the data in a variety of formats.
              </Typography>
              
              <footer className={classes.footerContainer}>
                  <img src={poweredByAcis} alt={'Powered by ACIS'} />
              </footer>
            </>
          }
        </div>
      </main>
    </>
  )
}

export default Main;