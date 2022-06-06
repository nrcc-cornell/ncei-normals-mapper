import React, {useState} from 'react';
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	infoPopover: {
        width: drawerWidth+"px",
	},
}));

const InfoAdornment = (props) => {
  const { content, inputAdornmentClass=null, edge="end" } = props;
  const [anchorEl, setAnchorEl] = useState();
  const classes = useStyles();

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <InputAdornment position="end" className={inputAdornmentClass} >
      <IconButton 
        aria-label="toggle info pane visibility"
        onClick={handleInfoClick} 
        tabIndex="-1" 
        edge={edge}
      >
        <InfoIcon fontSize="small" />
      </IconButton>
    </InputAdornment>


    <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleInfoClose}
        className={classes.infoPopover}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        PaperProps={{style:{padding:"0.5em", border: "1pt solid midnightblue", backgroundColor:"whitesmoke"}}}
    >
        <Typography variant="body1">
            {content}
        </Typography>
    </Popover>
</>

  );
}

export default InfoAdornment;
