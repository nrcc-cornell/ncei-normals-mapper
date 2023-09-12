import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import InputParamsContext from './InputParamsContext';
import { seasons } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	listContainer: {
		border: "1pt solid lightgray",
		padding: 0,
	},
}));

const SeasonSelect = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputContext = useContext(InputParamsContext);
	const classes = useStyles();

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
		inputContext.updateInputParams({sdate:"1991-"+seasons[index][1], edate:"1991-"+seasons[index][2]});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		inputContext.updateInputParams({sdate:"1991-"+seasons[selectedIndex][1], edate:"1991-"+seasons[selectedIndex][2]});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<List className={classes.listContainer} aria-label="Season selection">
				<ListItem
					button
					aria-haspopup="true"
					aria-controls="season-menu"
					aria-label="selected season"
					onClick={handleClickListItem}
				>
					<ListItemText primary="Click to select season" secondary={"Currently selected: "+seasons[selectedIndex][0]} />
				</ListItem>
			</List>
			<Menu
				id="season-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose} 
			>
				{seasons.map((option, index) => (
					<MenuItem
						key={index}
						selected={index === selectedIndex}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option[0]}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

export default SeasonSelect;