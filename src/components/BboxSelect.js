import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';
import InfoAdornment from './InfoAdornment';
import { infoText } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	bboxInputLabel: {
		color: "rgba(0,0,0,0.87)",
	},
	bboxFormControl: {
		width: "20%",
		marginRight: "0.5em",
	},
	bboxTitle: {
		marginBottom: "0.75em",
	},
	inputAdornmentClass: {
		display: "inline-flex",
		verticalAlign: "text-bottom",
	}
}));

const BboxSelect = (props) => {
	const { updateInputParams } = props;
	const [bbox, setBbox] = useState(['','','','']);
	const classes = useStyles();

	const handleChange = (event, index) => {
		const newBbox = bbox;
		let newValue = event.target.value;
		// longitude must be negative
		if ((index === 0 || index === 2) && newValue > 0) {
			newValue = newValue * -1.0
		}
		newBbox[index] = newValue;
		setBbox(newBbox);
		updateInputParams({areaDef: {bbox:newBbox}})
	};
	
	useEffect(() => {
		updateInputParams({areaDef: {bbox:['','','','']}});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<FormControl size="small" className={classes.bboxTitle}>
				<FormLabel>Specify bounding box in decimal degrees:</FormLabel>
			</FormControl>

			<FormControl variant="outlined" size="small" className={classes.bboxFormControl}>
				<InputLabel htmlFor="bboxInputW" className={classes.bboxInputLabel}>West</InputLabel>
				<OutlinedInput
					value={bbox[0]}
					id="bboxInputW"
					label="West"
					onChange={(event) => handleChange(event, 0)}
				/>
			 </FormControl>

			<FormControl variant="outlined" size="small" className={classes.bboxFormControl}>
				<InputLabel htmlFor="bboxInputS" className={classes.bboxInputLabel}>South</InputLabel>
				<OutlinedInput
					value={bbox[1]}
					id="bboxInputS"
					label="South"
					onChange={(event) => handleChange(event, 1)}
				/>
			</FormControl>

			<FormControl variant="outlined" size="small" className={classes.bboxFormControl}>
				<InputLabel htmlFor="bboxInputE" className={classes.bboxInputLabel}>East</InputLabel>
				<OutlinedInput
					value={bbox[2]}
					id="bboxInputE"
					label="East"
					onChange={(event) => handleChange(event, 2)}
				/>
			</FormControl>

			<FormControl variant="outlined" size="small" className={classes.bboxFormControl}>
				<InputLabel htmlFor="bboxInputN" className={classes.bboxInputLabel}>North</InputLabel>
				<OutlinedInput
					value={bbox[3]}
					id="bboxInputN"
					label="North"
					onChange={(event) => handleChange(event, 3)}
				/>
			</FormControl>

			<InfoAdornment 
				content={infoText.bbox} 
				inputAdornmentClass={classes.inputAdornmentClass} 
				edge="start"
			/>
		</>
		);
	}

export default BboxSelect;
