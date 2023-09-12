import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import InputParamsContext from './InputParamsContext';
import { regions } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	listContainer: {
		border: "1pt solid lightgray",
		padding: 0,
	},
}));

const RegionSelect = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(12);  // default (ME,WV)
	const inputContext = useContext(InputParamsContext);
	const classes = useStyles();

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
		inputContext.updateInputParams({areaDef: {state:regions[index].states.replaceAll('-',',')}});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		inputContext.updateInputParams({areaDef: {state:regions[selectedIndex].states.replaceAll('-',',')}});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<List className={classes.listContainer} aria-label="Region selection">
				<ListItem
					button
					aria-haspopup="true"
					aria-controls="reguib-menu"
					aria-label="selected region"
					onClick={handleClickListItem}
				>
					<ListItemText primary="Click to select region" secondary={"Currently selected: "+regions[selectedIndex].name} />
				</ListItem>
			</List>
			<Menu
				id="element-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose} 
			>
				{regions.map((option, index) => (
					<MenuItem
						key={index}
						selected={index === selectedIndex}
						disabled={option.states < 0}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}

export default RegionSelect;