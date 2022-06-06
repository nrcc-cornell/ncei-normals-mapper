import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ElementSelect from './ElementSelect';
import DateSelect from './DateSelect';
import AreaSelect from './AreaSelect';
import ImageSelect from './ImageSelect';
import { drawerWidth } from '../utilities/constants';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	menuButton: {
		"&:focus": {
			color: "#3f51b5",
			backgroundColor: "lightblue",
		},
		"&:hover": {
			color: "#3f51b5",
			backgroundColor: "lightblue",
		},
	},
	submitButton: {
		backgroundColor: "midnightblue",
		color: "white",
		"&:focus": {
			color: "midnightblue",
			backgroundColor: "lightblue",
		},
		"&:hover": {
			color: "midnightblue",
			backgroundColor: "lightblue",
		},
		marginBottom: "1em",
	},
}));

const OptionsSelection = (props) => {
	const {open, handleDrawerClose, handleViewMapClick} = props;
	const classes = useStyles();

	return (
		<>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{ paper: classes.drawerPaper }}
			>
				<div className={classes.drawerHeader}>
					<Tooltip title="Close options selection">
						<IconButton className={classes.menuButton} aria-label="close options selection" onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</Tooltip>
				</div>
				<Divider />

				<AreaSelect />
				<ElementSelect />
				<DateSelect />
				<ImageSelect />

				<Tooltip title="submit request">
					<Button variant="outlined" size="medium" className={classes.submitButton} onClick={handleViewMapClick}>
						Submit request
					</Button>
				</Tooltip>
			</Drawer>
		</>
	)
}

export default OptionsSelection;