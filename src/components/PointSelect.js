import React, { useState, useContext, useEffect } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InfoAdornment from './InfoAdornment';
import { infoText } from '../utilities/constants';
import InputParamsContext from './InputParamsContext';

const useStyles = makeStyles((theme) => ({
	locInputLabel: {
		color: "rgba(0,0,0,0.87)",
    },
    locFormControl: {
        width: "30%",
        marginRight: "0.5em",
    },
    locTitle: {
        marginBottom: "0.75em",
    },
    inputAdornmentClass: {
        display: "inline-flex",
        verticalAlign: "text-bottom",
    }
}));

const PointSelect = () => {
    const inputContext = useContext(InputParamsContext);
    const [loc, setLoc] = useState(['','']);
    const classes = useStyles();

    const handleChange = (event, index) => {
        const newLoc = loc;
        let newValue = event.target.value;
        if (index === 0 && newValue > 0) {
            newValue = newValue * -1.0
        }
        newLoc[index] = newValue;
		setLoc(newLoc);
		inputContext.updateInputParams({areaDef: {loc:newLoc}});	
    };
    
    useEffect(() => {
        inputContext.updateInputParams({areaDef: {loc:['','']}});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <FormControl size="small" className={classes.locTitle}>
                <FormLabel>Specify point in decimal degrees:</FormLabel>
            </FormControl>
            <br />

            <FormControl variant="outlined" size="small" className={classes.locFormControl}>
                <InputLabel htmlFor="locInputW" className={classes.locInputLabel}>Longitude</InputLabel>
                <OutlinedInput
                    value={loc[0]}
                    id="ptlon"
                    label="Longitude"
                    onChange={(event) => handleChange(event, 0)}
                />
             </FormControl>

            <FormControl variant="outlined" size="small" className={classes.locFormControl}>
                <InputLabel htmlFor="locInputS" className={classes.locInputLabel}>Latitude</InputLabel>
                <OutlinedInput
                    value={loc[1]}
                    id="ptlat"
                    label="Latitude"
                    onChange={(event) => handleChange(event, 1)}
                />
            </FormControl>

             <InfoAdornment 
                content={infoText.loc} 
                inputAdornmentClass={classes.inputAdornmentClass} 
                edge="start"
            />
        </>
        );
    }

export default PointSelect;
