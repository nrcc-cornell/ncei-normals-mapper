import React, { useEffect, useRef, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	keyContainer: {
		marginTop: "1em",
	},
}));

const MapLegend = (props) => {
	const { imgInfo, propLevels, updateLevels, updateColors } = props;
	const { levels, cmap, range } = imgInfo;
	const [ width, setWidth ] = useState();
	const [ eachWidth, setEachWidth ] = useState();
	const ref = useRef(null);
	const classes = useStyles();
	const color_styles = cmap.map((color) => { return {height: "28px", backgroundColor: color, opacity: "0.8"} });

	useEffect(() => {
		// trim off insignificant digits e.g. 1.10000000001 => 1.1
		const levelLabels = levels.map((lev) => {
			return (Math.abs(Math.round(lev*100)/100 - lev) > 0) ? parseFloat(lev.toFixed(2)) : lev;
		})
		// remove levels above or below range of values (i.e. unused colors), unless explicitly requested by client
		if (propLevels.client.length === 0) {
			if (levelLabels[levelLabels.length-1] >= range[1]) {
				levelLabels.pop();
				cmap.pop();
			}
			if (levelLabels[0] < range[0]) {
				levelLabels.shift()
				cmap.shift()
			}
		}
		updateLevels({server: levelLabels});
		updateColors({server: cmap});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [levels])

	useEffect(() => {
		if (ref) {
			const elemWidth = ref.current.offsetWidth;
			const defaultWidth = cmap.length * 56;
			setWidth(Math.min(defaultWidth, elemWidth));
			setEachWidth(Math.min(defaultWidth, elemWidth)/cmap.length);
		}
	},[cmap.length]);

	return (
		<>
			<TableContainer className={classes.keyContainer} ref={ref}>
				{width &&
					<Table size="small" padding="none" style={{width:width}} aria-label="color table">
						<TableBody>
							<TableRow>
								{color_styles.map((cs, i) => (
									<TableCell key={i} style={cs}></TableCell>
								))}
							</TableRow>	
						</TableBody>
					</Table>
				}
			</TableContainer>

			<TableContainer>
				{width &&
					<Table size="small" padding="none" style={{width:width}} aria-label="color table">
						<TableBody>
							<TableRow>
								<TableCell style={{width:eachWidth/2}}></TableCell>
								{propLevels.server.map((lv, i) => (
									<TableCell key={i}align="center" style={{width:eachWidth}}>{lv}</TableCell>
								))}
								<TableCell style={{width:eachWidth/2}}></TableCell>
							</TableRow>	
						</TableBody>
					</Table>
				}
			</TableContainer>
		</>
	);
}

export default MapLegend;
