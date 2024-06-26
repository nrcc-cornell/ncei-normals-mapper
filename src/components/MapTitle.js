import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { elementNames, months } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		margin: "0",
	},
}));

const MapTitle = (props) => {
	const { submittedParams, inputParams } = props;
	const [ same, setSame ] = useState(true)
	const classes = useStyles();
	const selectedElem = submittedParams.elems[0].hasOwnProperty('elem') ? submittedParams.elems[0].elem.name : submittedParams.elems[0].name;
	const selectedDuration = submittedParams.elems[0].duration;
	const selectedInterval = submittedParams.elems[0].interval.length === 3 ? 'Daily ' : 'Monthly ';
	const selectedUnits = submittedParams.elems[0].interval.length === 3 ? "days" : "months";
	const selectedName = elementNames()[selectedElem];
	const [,smn,sdy] = inputParams.sdate.split("-");
	const [,emn,edy] = inputParams.edate.split("-");;
	const selectedStart = months[parseInt(smn)-1][0] + (submittedParams.elems[0].interval.length === 3 ? (" " + parseInt(sdy)) : "");
	const selectedEnd = months[parseInt(emn)-1][0] + (submittedParams.elems[0].interval.length === 3 ? (" " + parseInt(edy)) : "");
	const selectedDate = (selectedDuration === 1 ? "Month of " : "") + selectedEnd;

	useEffect(() => {
		if (submittedParams.bbox && inputParams.areaDef.bbox) {
			setSame(submittedParams.bbox.every((val, i) => val === inputParams.areaDef.bbox[i]));
		} else if (submittedParams.loc && inputParams.areaDef.loc) {
			setSame(submittedParams.loc.every((val, i) => val === inputParams.areaDef.loc[i]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputParams])

	return (
		<div className={classes.titleContainer}>
			{submittedParams.output !== 'json' &&
				<Typography variant="subtitle1">
					{selectedDuration === 1 ? selectedInterval : ""}
					{selectedName} 
				</Typography>
			}
			{selectedDuration > 1 &&
				<Typography variant="subtitle1">
				   {selectedStart} through {selectedDate} ({selectedDuration} {selectedUnits})
				</Typography>
			}
			{selectedDuration === 1 &&
				<Typography variant="subtitle1">
					{selectedDate}
				</Typography>
			}
			{submittedParams.bbox && !same &&
				<Typography variant="subtitle1">
					Bounding box: [{submittedParams.bbox.join(", ")}] (modified to fit dataset constraints)
				</Typography>
			}
			{submittedParams.loc &&
				<Typography variant="subtitle1">
					Location (degrees): [{submittedParams.loc.join(", ")}] {same ? "" : "(modified to fit dataset constraints)"}
				</Typography>
			}
		</div>
	);
}

export default MapTitle;