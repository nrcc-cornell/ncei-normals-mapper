import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
	const paramsString = JSON.stringify(submittedParams, null, 2);

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