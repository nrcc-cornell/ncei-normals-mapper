import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { infoText } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	colorsContainer: {
		marginTop: "0.75em",
		border: "1pt solid lightgray",
		padding: 0,
	},
	listContainer: {
		padding:0,
	},
	colorFormControl: {
		width: "100%",
	},
	colorInputLabel: {
		color: "rgba(0,0,0,0.87)",
	},
	colorbarContainer: {
		margin:"0 1em 0.5em 1em",
		width:"unset",
	},
	errormsg: {
		color: "red",
		marginTop: "6px",
		fontSize: "90%",
	},
}));

const ColorsSelect = (props) => {
	const { updateInputParams, inputParams, levels, colors } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [ colorCount, setColorCount ] = useState(0);
	const [ cmp, setCmp ] = useState('Jet');
	const [ colorError, setColorError ] = useState(false);
	const classes = useStyles();

	const colormaps = require('../utilities/colorbrewer.json');
	const colormap_keys = Object.keys(colormaps);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (val) => {
		setAnchorEl(null);
		setCmp(val);;
		if (colormaps[val].hasOwnProperty(colorCount)) {
			const newColors = colormaps[val][colorCount];
			if (levels.client.length === 0) {
				updateInputParams({image: {...inputParams.image, cmap: newColors, levels: levels.server.join(",")}});
			} else {
				updateInputParams({image: {...inputParams.image, cmap: newColors}});
			}
			setColorError(false);
		} else {
			updateInputParams({image: {...inputParams.image, cmap: []}});
			setColorError(true);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (colors.server) {
			setColorCount(colors.server.length);
			setColorError(false);
		}
	}, [colors.server]);

	useEffect(() => {
		if (typeof inputParams.image.levels === 'string' && inputParams.image.levels.length >= 0) {
			const levelLength = inputParams.image.levels.split(",").length;
			setColorCount(levelLength + 1);
			if (colormaps[cmp].hasOwnProperty(levelLength + 1)) {
				const newColors = colormaps[cmp][levelLength + 1];
				updateInputParams({image: {...inputParams.image, cmap: newColors}});
				setColorError(false);
			} else {
				updateInputParams({image: {...inputParams.image, cmap: []}});
				setCmp('Jet');
				setColorError(levelLength === 1 ? false : true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputParams.image.levels]);

	return ( 
		<div className={classes.colorsContainer}>
			{(levels.client.length > 0 || levels.server.length > 0) &&
				<>
					<List className={classes.listContainer} aria-label="color selection">
						<ListItem
							button
							aria-haspopup="true"
							aria-controls="color-map-menu"
							aria-label="selected-color"
							onClick={handleClickListItem}
						>
							<ListItemText primary="Click to change color map" secondary={"Currently selected: "+cmp} />
						</ListItem>
					</List>

					<Menu
						id="color-map-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose} 
					>
						{colormap_keys.map((val, index) => (
							<MenuItem
								key={val}
								selected={val === cmp}
								onClick={(event) => handleMenuItemClick(val)}
							>
								<TableContainer>
									<Table padding="none" aria-label="color table">
										<TableBody>
											{colormaps[val].hasOwnProperty(colorCount) &&
												<TableRow>
													{colormaps[val][colorCount].map((cs, i) => (
														<TableCell key={i} style={{width:"1em", backgroundColor:"" + cs + ""}}>&nbsp;</TableCell>
													))}
													<TableCell style={{paddingLeft:"1em"}}>{val}</TableCell>
												</TableRow>	
											}
										</TableBody>
									</Table>
								</TableContainer>
							</MenuItem>
						))}
					</Menu>

					{cmp && !colorError && colormaps[cmp].hasOwnProperty(colorCount) &&
						<TableContainer className={classes.colorbarContainer}>
							<Table size="small" padding="none" aria-label="color table">
								<TableBody>
									<TableRow>
										{colormaps[cmp][colorCount].map((cs, i) => (
											<TableCell key={i} style={{width:"1em", backgroundColor:"" + cs + ""}}>&nbsp;</TableCell>
										))}
									</TableRow>	
								</TableBody>
							</Table>
						</TableContainer>
					}
				</>
			}

			{colorError &&
				<Typography variant="body1" className={classes.errormsg} gutterBottom>
					{infoText.colors}
				</Typography>
			}

		</div>
	);
}

export default ColorsSelect;