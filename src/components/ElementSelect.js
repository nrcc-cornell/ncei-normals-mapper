import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { elements } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	areaContainer: {
		borderLeft: "1pt solid midnightblue",
		borderRight: "1pt solid midnightblue",
		borderBottom: "1pt solid midnightblue",
		borderTop: "0",
		padding: "1em 1em",
	},
	listContainer: {
		marginTop: "0.5em",
		border: "1pt solid lightgray",
		padding: 0,
	},
}));

const ElementSelect = (props) => {
	const { inputParams, updateInputParams } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const classes = useStyles();
	const isPoint = inputParams.areaDef.hasOwnProperty('loc');

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
		const newElems = inputParams.elems;
		newElems[0] = {...newElems[0], name: elements[index].name, reduce: elements[index].reduce}
		updateInputParams({elems: newElems});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.areaContainer}>
			<Typography variant="body1">
				Select element
			</Typography>
			<List className={classes.listContainer} aria-label="Element selection">
				<ListItem
					button
					aria-haspopup="true"
					aria-controls="element-menu"
					aria-label="selected-element"
					onClick={handleClickListItem}
				>
					<ListItemText primary="Click to select element" secondary={"Currently selected: "+elements[selectedIndex].menuName} />
				</ListItem>
			</List>
			<Menu
				id="element-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose} 
			>
				{elements.map((option, index) => (
					<MenuItem
						key={option.menuName}
						selected={index === selectedIndex}
						disabled={option.name === 'all' && !isPoint}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option.menuName}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

export default ElementSelect;