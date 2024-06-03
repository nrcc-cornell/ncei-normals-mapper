import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import LevelsSelect from './LevelsSelect';
import ColorsSelect from './ColorsSelect';

const useStyles = makeStyles((theme) => ({
	imageOptionsContainer: {
		borderLeft: "1pt solid midnightblue",
		borderRight: "1pt solid midnightblue",
		borderBottom: "1pt solid midnightblue",
		padding: 0,
	},
	accordionDetailsContainer: {
		paddingTop: 0,
	},
	accordianSummaryRoot: {
		minHeight: "1em",
		marginTop: "1em",
		marginBottom: "1em",
		'&$expanded': {
			minHeight: "1em",
			marginBottom: "0.5em",
		},
	},
	accordianSummaryContent: {
		margin: 0,
		padding:  0,
		'&$expanded': {
			margin: 0,
		},
	},
	expanded: {},
	expandIcon: {
		paddingTop: 0,
		paddingBottom: 0,
	},
	vertCheckbox: {
		color: "midnightblue !important",
		padding: "3px",
		fontSize: "90%",
	},
}));

const ImageSelect = (props) => {
	const { inputParams, updateInputParams, levels, colors } = props;
	const [ stateOutlines, setStateOutlines ] = useState(true);
	const [ countyOutlines, setCountyOutlines ] = useState(true);
	const classes = useStyles();

	const handleCheckboxChange = (event) => {
		if (event.target.name === 'stateOutlines') {
			setStateOutlines(event.target.checked);
		} else if (event.target.name === 'countyOutlines') {
			setCountyOutlines(event.target.checked);
		}
	};

	useEffect(() => {
		const newOverlays = [
			stateOutlines ? "state:1:black" : "state:0:black",
			countyOutlines ? "county:0.5:grey" : "county:0:grey"
		];
		updateInputParams({image: {...inputParams.image, overlays: newOverlays}});	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateOutlines, countyOutlines]);

	return ( 
		<div className={classes.imageOptionsContainer}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="image-options-content"
					id="image-options-header"
					classes={{root: classes.accordianSummaryRoot, content: classes.accordianSummaryContent, expanded: classes.expanded, expandIcon: classes.expandIcon}}
				>
					<Typography variant="body1">Image Settings</Typography>
				</AccordionSummary>
				<AccordionDetails
					className={classes.accordionDetailsContainer}
				>
					<FormControl component="fieldset" style={{width:"100%"}}>
						<FormControlLabel
							control={
								<Checkbox size="small" checked={stateOutlines} className={classes.vertCheckbox} onChange={handleCheckboxChange} name="stateOutlines" />
							}
							label="Show state outlines"
						/>
						<FormControlLabel
							control={
								<Checkbox size="small" checked={countyOutlines} className={classes.vertCheckbox} onChange={handleCheckboxChange} name="countyOutlines" />
							}
							label="Show county outlines"
						/>
					
					<LevelsSelect 
						inputParams={inputParams}
						updateInputParams={updateInputParams}
						levels={levels}
					/>
					<ColorsSelect 
						inputParams={inputParams}
						updateInputParams={updateInputParams}
						levels={levels}
						colors={colors}
					/>
					</FormControl>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default ImageSelect;