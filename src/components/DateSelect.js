import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import InputParamsContext from './InputParamsContext';
import SeasonSelect from './SeasonSelect';
import RenderDate from './RenderDate';

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

const DateSelect = () => {
	const [dateType, setDateType] = useState('month');
	const classes = useStyles();
	const inputContext = useContext(InputParamsContext);
 
	const handleTypeChange = (event) => {
		const newDateType = event.target.value;
		setDateType(newDateType);
		if (newDateType === 'month') {
			inputContext.updateInputParams({sdate: inputContext.inputParams.edate});
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

			{dateType === 'interval' &&
				<div>
					<RenderDate
						dateLegend='Start month'
						dateParam='sdate'
						id="select-smonth"
						justMonth={true}
					/>
					<Typography className={classes.dateSeperator}>
						-
					</Typography>
					<RenderDate 
						dateLegend='End month'
						dateParam='edate'
						id="select-emonth"
						justMonth={true}
					/>
				</div>
			}
			{dateType === 'month' &&
				<div>
					<RenderDate
						dateLegend='Month'
						dateParam='date'
						id="select-month"
						justMonth={true}
					/>
				</div>
		}
			{dateType === 'season' &&
				<SeasonSelect />
		}
		</div>
	)
}

export default DateSelect;

/*
		newElems[0] = {...newElems[0], interval: newDateType === 'month' ? [0,1] : [0,0,1], duration: newDateType === 'interval' ? null : 1} // "interval" duration set in Getimage
					<FormControlLabel value="day" control={<Radio size="small" className={classes.radioButton} />} label="Day" />

			{dateType === 'day' &&
				<div>
					<RenderDate
						dateLegend='Date'
						dateParam='edate'
					/>
				</div>
			}

			dateType === 'interval' &&
				<div>
					<RenderDate
						dateLegend='Start date'
						dateParam='sdate'
					/>
					<Typography className={classes.dateSeperator}>
						-
					</Typography>
					<RenderDate 
						dateLegend='End date'
						dateParam='edate'
					/>
				</div>
			}

*/