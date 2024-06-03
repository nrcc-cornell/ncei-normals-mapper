import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import SeasonSelect from './SeasonSelect';
import DateRange from './DateRange';
import { months, seasons } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	dateTypeContainer: {
		borderLeft: "1pt solid midnightblue",
		borderRight: "1pt solid midnightblue",
		borderBottom: "1pt solid midnightblue",
		padding: "1em 1em",
	},
	radioButton: {
		color: "midnightblue !important",
		paddingRight: "3px",
	},
	formControl: {
		marginTop: "0.5em",
	},
	dateSeperator: {
		display: "inline-block",
		lineHeight: "2.5em",
		verticalAlign: "bottom",
		margin: "0.5em 0.5em 0.25em",
	},
}));

const DateSelect = (props) => {
	const { updateInputParams, inputParams } = props;
	const [dateType, setDateType] = useState('month');
	const classes = useStyles();
 
	const handleTypeChange = (event) => {
		const newDateType = event.target.value;
		setDateType(newDateType);
		if (newDateType === 'month') {
			updateInputParams({sdate: inputParams.edate});
		}
	};
	
	return (
		<div className={classes.dateTypeContainer}>
			<Typography variant="body1">
				Select date
			</Typography>

			<FormControl component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">Date type:</FormLabel>
				<RadioGroup row aria-label="date type" name="datetype" value={dateType} onChange={handleTypeChange}>
					<FormControlLabel value="month" control={<Radio size="small" className={classes.radioButton} />} label="Month" />
					<FormControlLabel value="season" control={<Radio size="small" className={classes.radioButton} />} label="Season/Year" />
					<FormControlLabel value="interval" control={<Radio size="small" className={classes.radioButton} />} label="Interval" />
				</RadioGroup>
			</FormControl>

			{dateType === 'month' &&
				<SeasonSelect 
					choices={months}
					label="Click to select month"
					updateInputParams = {updateInputParams}
				/>
			}
			{dateType === 'season' &&
				<SeasonSelect 
					choices={seasons}
					label="Click to select season"
					updateInputParams = {updateInputParams}
				/>
			}
			{dateType === 'interval' &&
				<DateRange 
					updateInputParams = {updateInputParams}
				/>
			}
		</div>
	)
}

export default DateSelect;