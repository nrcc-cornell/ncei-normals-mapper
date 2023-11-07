import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	preContainer: {
		display:"inline-block", 
		padding:"0 1em",
		margin: "0 0 0.5em",
		backgroundColor: "whitesmoke",
	},
	preStyle: {
		marginTop: 0,
		fontSize: "90%",
	},
}));

const DisplayRequest = (props) => {
    const { submittedParams } = props;
	const classes = useStyles();
	let paramsString = JSON.stringify(submittedParams, null, 2);
	paramsString = paramsString.replace("png","image");			// stop gap; should be changed upstream

	return (
		<>
            <Paper variant="outlined" className={classes.preContainer}>
                <Typography variant="subtitle1">
                    Request:
                </Typography>
                <pre className={classes.preStyle}>
                    {paramsString}
                </pre>
            </Paper>
		</>
	);
}

export default DisplayRequest;