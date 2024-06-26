import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { infoText } from '../utilities/constants';
import InfoAdornment from './InfoAdornment';
import SubstateSelect from './SubstateSelect';

const useStyles = makeStyles((theme) => ({
	stateInputLabel: {
		color: "rgba(0,0,0,0.87)",
	},
	mainGridContainer: {
		marginTop: "0.5em",
	},
	vertRadioButton: {
		color: "midnightblue !important",
		padding: "6px",
		fontSize: "90%",
	},
}));

const StateSelect = (props) => {
		const { updateInputParams, inputParams } = props;
		const [postals, setPostals] = useState(inputParams.areaDef.state ? inputParams.areaDef.state : "ME,WV");
		const [stateType, setStateType] = useState("all");
		const classes = useStyles();
		
		const handleTypeChange = (event) => {
			const newStateType = event.target.value;
			setStateType(newStateType);
			if (newStateType === 'all') {
				updateInputParams({areaDef: {state: postals}, stateType: newStateType});
			} else {
				updateInputParams({stateType: newStateType});
			}
		};

		const handleStateChange = (event) => {
			const newPostals = event.target.value.replace(" ","");
			setPostals(newPostals);
			updateInputParams({areaDef: {state:newPostals}});	
		};

		useEffect(() => {
			updateInputParams({areaDef: {state: inputParams.areaDef.state ? inputParams.areaDef.state : "ME,WV"}});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<>
				<FormControl variant="outlined">
					<InputLabel htmlFor="stateInput" className={classes.stateInputLabel}>State(s)</InputLabel>
					<OutlinedInput
						value={postals}
						id="stateInput"
						label="State(s)"
						margin="dense"
						inputProps={{ spellCheck: false }}
						onChange={handleStateChange}
						endAdornment={<InfoAdornment content={infoText.postal} />}
					/>
					<FormHelperText>Enter one or more state postal abbreviations</FormHelperText>
				</FormControl>

				<Grid container spacing={0} className={classes.mainGridContainer}>
					<Grid item>
						<FormControl component="fieldset">
							<FormLabel component="legend">State options:</FormLabel>
							<RadioGroup  aria-label="state type" name="statetype" value={stateType} onChange={handleTypeChange}>
								<FormControlLabel 
									value="all" 
									control={<Radio size="small" className={classes.vertRadioButton} />} 
									label="Entire area" 
								/>
								<FormControlLabel 
									value="county" 
									control={<Radio size="small" className={classes.vertRadioButton}/>} 
									label="County" 
								/>
								<FormControlLabel 
									value="climdiv" 
									control={<Radio size="small" className={classes.vertRadioButton} />} 
									label="Climate division" 
								/>
								<FormControlLabel 
									value="cwa" 
									control={<Radio size="small" className={classes.vertRadioButton} />} 
									label="CWA" 
								/>
								<FormControlLabel 
									value="basin" 
									control={<Radio size="small" className={classes.vertRadioButton} />} 
									label="Basin" 
								/>
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item>
						{(stateType !== "all") &&
							<SubstateSelect 
								postals={postals} 
								stateType={stateType}
								updateInputParams={updateInputParams} />
						}
					</Grid>
				</Grid>
			</>
		);
 };

export default StateSelect;
