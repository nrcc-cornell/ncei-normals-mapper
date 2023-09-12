import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, ImageOverlay, AttributionControl } from 'react-leaflet';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	nav: {
		position: "absolute",
		top: 0,
		left: 0,
		padding: "3px",
	},
	mapContainer: {
		border: "1pt solid midnightblue",
		height: window.innerHeight * 0.6,
	},
	rangeControl: {
		color: "midnightblue",
		paddingLeft: "0.5em",
	},
}));

const LeafletMap = (props) => {
	const { imgsrc, dataBbox, range } = props;
	const [ bbox, setBbox ] = useState();
	const [ imgcoords, setImgcoords ] = useState();
	const classes = useStyles();

	useEffect(() => {
		if (dataBbox) {
			// setup bounding box (bounds)
			setBbox([parseFloat(dataBbox[0][0]),parseFloat(dataBbox[0][1]),parseFloat(dataBbox[1][0]),parseFloat(dataBbox[1][1])]);
			// convert bbox to Leaflet coordinates (rectangle around image)
			setImgcoords([ [dataBbox[1][1],dataBbox[0][0]], [dataBbox[1][1],dataBbox[1][0]], [dataBbox[0][1],dataBbox[1][0]], [dataBbox[0][1],dataBbox[0][0]] ]);
		}
	}, [dataBbox]);


	return (
		<>
			<div className={classes.mapContainer}>
				{bbox && 
					<MapContainer 
						bounds={[[bbox[1], bbox[0]], [bbox[3], bbox[2]]]}
						zoomControl={true}
						scrollWheelZoom={true}
						attributionControl={false}
					>
						<AttributionControl position="bottomright" prefix={"<a href='https://leafletjs.com'>Leaflet</a>"} />

						<TileLayer
							url='https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
						/>

						{imgcoords &&
							<>
								<Polygon 
									pathOptions={{color:"lightgray", weight:1, fill:false}}
									positions={imgcoords} 
								/>								  
								<div className='leaflet-bottom leaflet-left'>
									<span className={classes.rangeControl}>Range: {range[0].toFixed(2)} to {range[1].toFixed(2)}</span>
    							</div>
							</>
						}

						{imgcoords && imgsrc &&
							<ImageOverlay
								url={imgsrc}
								bounds={imgcoords}
								opacity={0.8}
								zIndex={10}
							/>
						}

					</MapContainer>
				}
			</div>
		</>
	);
}

export default LeafletMap;
