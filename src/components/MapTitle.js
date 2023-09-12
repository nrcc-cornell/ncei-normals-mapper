import React, {useContext} from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import InputParamsContext from './InputParamsContext';
import { elementNames, months } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		margin: "0",
	},
}));

const MapTitle = (props) => {
	const { submittedParams } = props;
	const inputContext = useContext(InputParamsContext);
	const classes = useStyles();
	const selectedElem = submittedParams.elems[0].elem.name;
	const selectedDuration = submittedParams.elems[0].duration;
	const selectedInterval = submittedParams.elems[0].interval.length === 3 ? 'Daily' : 'Monthly';
	const selectedName = elementNames()[selectedElem];
	const [,smn] = inputContext.inputParams.sdate.split("-");
	const [,emn] = inputContext.inputParams.edate.split("-");
	const selectedStart = months[parseInt(smn)-1];
	const selectedDate = selectedDuration === 1 ? ("Month of "+months[parseInt(emn)-1]) : (months[parseInt(emn)-1]);
	let same = true;

	if (submittedParams.bbox) {
		same = submittedParams.bbox.every((val, i) => val === inputContext.inputParams.areaDef.bbox[i]);
	} else if (submittedParams.loc) {
		same = submittedParams.loc.every((val, i) => val === inputContext.inputParams.areaDef.loc[i]);
	}

	return (
		<div className={classes.titleContainer}>
			<Typography variant="subtitle1">
				{selectedDuration === 1 && selectedInterval+" "}
				{selectedName} 
			</Typography>
			{selectedDuration > 1 &&
				<Typography variant="subtitle1">
				   {selectedStart} through {selectedDate} ({selectedDuration} months)
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