import React, { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import InputParamsContext from './InputParamsContext';

const useStyles = makeStyles((theme) => ({
	listContainer: {
		border: "1pt solid lightgray",
		padding: 0,
	},
}));

const SeasonSelect = (params) => {
    const { choices, label } = params;
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
		inputContext.updateInputParams({sdate:"1991-"+choices[index][1], edate:"1991-"+choices[index][2]});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		inputContext.updateInputParams({sdate:"1991-"+choices[selectedIndex][1], edate:"1991-"+choices[selectedIndex][2]});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<List className={classes.listContainer} aria-label="Date selection">
				<ListItem
					button
					aria-haspopup="true"
					aria-controls="date-menu"
					aria-label="selected date"
					onClick={handleClickListItem}
				>
					<ListItemText primary={label} secondary={"Currently selected: "+choices[selectedIndex][0]} />
				</ListItem>
			</List>
			<Menu
				id="month-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose} 
			>
				{choices.map((option, index) => (
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