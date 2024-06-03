import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
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
    const cElems = ['date'];
    submittedParams.elems.forEach((e) => {
        const aname = e.hasOwnProperty('name') ? e.name : e.elem.name;
        cElems.push(aname);
    })

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
                        {cElems[i] !== 'date' &&
                            eNames[cElems[i]] + ": " + parseFloat(col).toFixed(cElems[i] === 'pcpn' ? 2 : 1)
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