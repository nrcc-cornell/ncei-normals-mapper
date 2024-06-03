import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InfoAdornment from './InfoAdornment';
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

const LevelsSelect = (props) => {
	const { inputParams, updateInputParams, levels } = props;
	const [ localLevels, setLocalLevels ] = useState("");
	const classes = useStyles();

	
	const handleLevelChange = (event) => {
		const newlevels = event.target.value.replace(" ","");;
		setLocalLevels(newlevels);
		updateInputParams({image: {...inputParams.image, levels: newlevels}});
	};

	useEffect(() => {
		if (levels.server) {
			const newlevels = levels.server.join(",");
			setLocalLevels(newlevels);	
		}
	}, [levels.server]);

	return ( 
        <div className={classes.levelsContainer}>
            <FormControl variant="outlined" className={classes.levelFormControl}>
                <InputLabel htmlFor="levelInput" className={classes.levelInputLabel}>Contour levels</InputLabel>
                <OutlinedInput
                    value={localLevels}
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