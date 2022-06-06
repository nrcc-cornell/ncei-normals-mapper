import React, { useState, useContext, useEffect } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputParamsContext from './InputParamsContext';
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

const StateSelect = () => {
		const inputContext = useContext(InputParamsContext);
		const [postals, setPostals] = useState(inputContext.inputParams.areaDef.state ? inputContext.inputParams.areaDef.state : "ME,WV");
		const [stateType, setStateType] = useState("all");
		const classes = useStyles();
		
		const handleTypeChange = (event) => {
			const newStateType = event.target.value;
			setStateType(newStateType);
			if (newStateType === 'all') {
				inputContext.updateInputParams({areaDef: {state: postals}, stateType: newStateType});
			} else {
				inputContext.updateInputParams({stateType: newStateType});
			}
		};

		const handleStateChange = (event) => {
			const newPostals = event.target.value.replace(" ","");
			setPostals(newPostals);
			inputContext.updateInputParams({areaDef: {state:newPostals}});	
		};

		useEffect(() => {
			inputContext.updateInputParams({areaDef: {state: inputContext.inputParams.areaDef.state ? inputContext.inputParams.areaDef.state : "ME,WV"}});
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
							<SubstateSelect postals={postals} stateType={stateType} />
						}
					</Grid>
				</Grid>
			</>
		);
 };

export default StateSelect;
