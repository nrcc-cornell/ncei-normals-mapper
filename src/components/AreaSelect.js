import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { makeStyles } from '@mui/styles';
import RegionSelect from './RegionSelect';
import StateSelect from './StateSelect';
import BboxSelect from './BboxSelect';
import PointSelect from './PointSelect';
import AlertDialog from './AlertDialog';

const useStyles = makeStyles((theme) => ({
	areaContainer: {
		border: "1pt solid midnightblue",
		padding: "1em 1em",
	},
	radioButton: {
		color: "midnightblue !important",
		paddingRight: "3px",
	},
	formControl: {
		marginTop: "0.5em",
		marginBottom: "0.5em",
	},
}));

const AreaSelect = (props) => {
	const { updateInputParams, inputParams } = props;
	const [areaType, setAreaType] = useState("state");
	const [alertStatus, setAlertStatus] = useState(false);
	const classes = useStyles();

	const handleTypeChange = (event) => {
		const newAreaType = event.target.value;
		// only point can have element of "all"; user must change if "all" is selected with anything else	
		if (newAreaType !== 'point' && inputParams.elems[0].name === 'all') {
			setAlertStatus(true);
		}
		setAreaType(newAreaType);	
	};

	const handleAlertClose = () => {
	  setAlertStatus(false);
	};
  
	return (
		<div className={classes.areaContainer}>
			<Typography variant="body1">
				Select area
			</Typography>

			<FormControl component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">Area type:</FormLabel>
				<RadioGroup row aria-label="area type" name="areatype" value={areaType} onChange={handleTypeChange}>
					<FormControlLabel value="state" control={<Radio size="small" className={classes.radioButton} />} label="State" />
					<FormControlLabel value="region" control={<Radio size="small" className={classes.radioButton} />} label="Region" />
					<FormControlLabel value="bbox" control={<Radio size="small" className={classes.radioButton} />} label="Box" />
					<FormControlLabel value="point" control={<Radio size="small" className={classes.radioButton} />} label="Point" />
				</RadioGroup>
			</FormControl>

			{areaType === 'state' &&
				<StateSelect 
					updateInputParams={updateInputParams}
					inputParams={inputParams}
				/>
			}
			{areaType === 'region' &&
				<RegionSelect 
					updateInputParams={updateInputParams}
				/>
			}
			{areaType === 'bbox' &&
				<BboxSelect 
					updateInputParams={updateInputParams}
				/>
			}
			{areaType === 'point' &&
				<PointSelect 
					updateInputParams={updateInputParams}
				/>
			}
			{alertStatus &&
				<AlertDialog 
					alertStatus={alertStatus}
					handleAlertClose={handleAlertClose}
					alertText="Element selection must be updated."
				/>
			}
		</div>
	);
}

export default AreaSelect;