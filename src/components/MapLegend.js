import React, { useEffect, useRef, useState, useContext } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import InputParamsContext from './InputParamsContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	keyContainer: {
		marginTop: "1em",
	},
}));

const MapLegend = (props) => {
	const { imgInfo } = props;
	const { levels, cmap, range } = imgInfo;
	const [ width, setWidth ] = useState();
	const [ eachWidth, setEachWidth ] = useState();
	const ref = useRef(null);
	const classes = useStyles();
	const color_styles = cmap.map((color) => { return {height: "28px", backgroundColor: color, opacity: "0.8"} });
	const inputContext = useContext(InputParamsContext);

	useEffect(() => {
		// trim off insignificant digits e.g. 1.10000000001 => 1.1
		const levelLabels = levels.map((lev) => {
			return (Math.abs(Math.round(lev*100)/100 - lev) > 0) ? parseFloat(lev.toFixed(2)) : lev;
		})
		// remove levels above or below range of values (i.e. unused colors), unless explicitly requested by client
		if (inputContext.levels.client.length === 0) {
			if (levelLabels[levelLabels.length-1] >= range[1]) {
				levelLabels.pop();
				cmap.pop();
			}
			if (levelLabels[0] < range[0]) {
				levelLabels.shift()
				cmap.shift()
			}
		}
		inputContext.updateLevels({server: levelLabels});
		inputContext.updateColors({server: cmap});
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
								{inputContext.levels.server.map((lv, i) => (
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
