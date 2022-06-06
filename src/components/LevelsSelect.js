import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InfoAdornment from './InfoAdornment';
import InputParamsContext from './InputParamsContext';
import { infoText } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
    levelsContainer: {
        marginTop: "0.75em",
    },
	levelFormControl: {
		width: "100%",
	},
	levelInputLabel: {
		color: "rgba(0,0,0,0.87)",
	},
}));

const LevelsSelect = () => {
	const [ levels, setLevels ] = useState("");
	const classes = useStyles();
	const inputContext = useContext(InputParamsContext);
	
	const handleLevelChange = (event) => {
		const newlevels = event.target.value.replace(" ","");;
		setLevels(newlevels);
		inputContext.updateInputParams({image: {...inputContext.inputParams.image, levels: newlevels}});
	};

	useEffect(() => {
		if (inputContext.levels.server) {
			const newlevels = inputContext.levels.server.join(",");
			setLevels(newlevels);	
		}
	}, [inputContext.levels.server]);

	return ( 
        <div className={classes.levelsContainer}>
            <FormControl variant="outlined" className={classes.levelFormControl}>
                <InputLabel htmlFor="levelInput" className={classes.levelInputLabel}>Contour levels</InputLabel>
                <OutlinedInput
                    value={levels}
                    id="levelInput"
                    label="Contour levels"
                    margin="dense"
                    inputProps={{ spellCheck: false }}
                    onChange={handleLevelChange}
                    endAdornment={<InfoAdornment content={infoText.levels} />}
                />
                <FormHelperText>Comma-separated contour level list; lowest to highest</FormHelperText>
            </FormControl>
		</div>
	);
}

export default LevelsSelect;