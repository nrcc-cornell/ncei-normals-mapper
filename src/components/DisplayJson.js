import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { elementNames } from '../utilities/constants';
import { downloadFetch } from '../utilities/utils';
import DisplayRequest from './DisplayRequest';
import MapTitle from './MapTitle';

const useStyles = makeStyles((theme) => ({
	resContainer: {
		display:"inline-block", 
		padding:"0 1em",
		margin: "0.5em 0 0.5em",
	},
    downloadButton: {
		margin: "1em 0.5em",
	},
}));

const DisplayJson = (props) => {
	const { jsonresp, submittedParams } = props;
    const [showParams, setShowParams] = useState(false);
    const classes = useStyles();
    const eNames = elementNames();
    const sElems = [{name:'date'}, ...submittedParams.elems];

	const handleShowParamsClick = () => {
		setShowParams(prev => !prev);
	}
 
    const handleDownJsonClick = () => {
		downloadFetch(submittedParams, 'normalsData.json', 'json');
	}

    return (
        <div>
            <MapTitle 
                submittedParams={submittedParams}
            />
            <Paper variant="outlined" className={classes.resContainer}>
                {jsonresp[0].map((col,i) => (
                    <Typography variant="body1" key={i}>
                        {sElems[i].name !== 'date' &&
                            eNames[sElems[i].elem.name] + ": " + parseFloat(col).toFixed(sElems[i].elem.name === 'pcpn' ? 2 : 1)
                        }
                    </Typography>
                ))}
            </Paper>
            <br />
            <Button variant="contained" size="small" className={classes.downloadButton} onClick={handleDownJsonClick}>Download data (json)</Button>
            <Button variant="contained" size="small" className={classes.downloadButton} onClick={handleShowParamsClick}>Display request (json)</Button>
            <br />
			{showParams &&
				<DisplayRequest 
					submittedParams={submittedParams}
				/>
			}
        </div>
    );
}

export default DisplayJson;