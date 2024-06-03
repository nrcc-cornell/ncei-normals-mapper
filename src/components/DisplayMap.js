import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import DisplayRequest from './DisplayRequest';
import { downloadFile, downloadFetch } from '../utilities/utils';
import LeafletMap from './LeafletMap';
import MapTitle from './MapTitle';
import MapLegend from './MapLegend';

const useStyles = makeStyles((theme) => ({
	downloadButton: {
		margin: "0 0.4em",
	},
	mapImage: {
		width: "100%",
	},
	mapTitleContainer: {
		borderLeft: "1pt solid midnightblue",
		borderRight: "1pt solid midnightblue",
		borderBottom: "1pt solid midnightblue",
		padding: "0.5em",
		marginBottom: "1em",
	},
}));

const DisplayMap = (props) => {
	const { imgsrc, submittedParams, imgInfo, inputParams, levels, updateLevels, updateColors } = props;
	const [showParams, setShowParams] = useState(false);
	const classes = useStyles();

	const handleDownPngClick = () => {
		downloadFile(imgsrc, 'normalsImage.png');
	};

	const handleDownTifClick = () => {
		downloadFetch(submittedParams, 'normalsGeo.tif', 'geotiff');
	}

	const handleDownJsonClick = () => {
		downloadFetch(submittedParams, 'normalsData.json', 'json');
	}

	const handleShowParamsClick = () => {
		setShowParams(prev => !prev);
	};

	return (
		<div id="mapContainer">
			<LeafletMap 
				imgsrc={imgsrc}
				dataBbox={imgInfo ? imgInfo.data_bbox : null}
				range={imgInfo ? imgInfo.range : null}
			/>
			<div className={classes.mapTitleContainer}>
				<MapTitle 
					submittedParams={submittedParams}
					inputParams={inputParams}
				/>
				{imgInfo &&
					<MapLegend 
						imgInfo={imgInfo}
						propLevels={levels}
						updateLevels={updateLevels}
						updateColors={updateColors}
					/>
				}
			</div>
			<Button variant="contained" size="small" className={classes.downloadButton} onClick={handleDownPngClick}>Download image (png)</Button>
			<Button variant="contained" size="small" className={classes.downloadButton} onClick={handleDownTifClick}>Download image (geotiff)</Button>
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

export default DisplayMap;
