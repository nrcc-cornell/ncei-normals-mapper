import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from '@mui/styles';
import { checkBbox } from '../utilities/utils';

const useStyles = makeStyles((theme) => ({
	progressContainer: {
        margin: "1.5em 3em",
        textAlign: "center",
    },
    progressText: {
        margin: 0,
        padding: "6px",
        color:  "rgba(0,0,0,0.54)",
    },
    listContainer: {
		border: "1pt solid lightgray",
        padding: 0,
    },
    listItem: {
        padding: "0 8px",
        maxWidth: "13em",
    }
}));

const SubstateSelect = (props) => {
	const { postals, stateType, updateInputParams } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [counties, setCounties] = useState();
    const [fetchError, setFetchError] = useState();
	const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const fetchGeneral = (jsonparams) => {
        if (postals.length >= 2) {
            fetch("https://data.rcc-acis.org/General/"+stateType, {body: jsonparams, method: "POST", headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    if (!response.ok) {
                        setFetchError("Error fetching the list");
                        return;
                    }
                    return response.json()
                })
                .then(response => {
                    if (response.meta && response.meta.length) {
                        setCounties(response.meta);
                        setSelectedIndex(0);
                        let bbox = response.meta[0].bbox;
                        bbox = checkBbox(bbox);
                        updateInputParams({areaDef: {bbox: bbox}});
                    } else {
                        setFetchError("No list for "+postals);
                    }
                })
                .catch(err => {
                    if (err.message.includes("Failed to execute 'createObjectURL' on 'URL'")) {
                        setFetchError("Invalid request");
                    } else {
                        setFetchError(err.message);
                    };
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setFetchError("Specify valid state above");
            setLoading(false);
        }
    };

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
        let bbox = counties[index].bbox;
        bbox = checkBbox(bbox);
		updateInputParams({areaDef: {bbox: bbox}});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

    useEffect(() => {
		// Reset 
		setFetchError();
		setLoading(true);
        setCounties(null);
        // Get list
        const jsonparams = JSON.stringify({state: postals, meta: "name,id,bbox"});
        fetchGeneral(jsonparams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ postals, stateType ]);
	
	return (
        <>
            {counties &&
                <>
                <List className={classes.listContainer} aria-label={stateType+" selection"}>
                    <ListItem
                        button
                        className={classes.listItem}
                        aria-haspopup="true"
                        aria-controls={stateType+"-menu"}
                        aria-label={"selected "+stateType}
                        onClick={handleClickListItem}
                    >
                        <ListItemText 
                            primary={"Click to select "+stateType} 
                            secondary={counties[selectedIndex] ? "Selected: "+counties[selectedIndex].name.replace(/County|Parish/,"") : ""} 
                        />
                    </ListItem>
                </List>
                <Menu
                    id={stateType+"-menu"}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose} 
                >
                    {counties.map((option, index) => (
                        <MenuItem
                            key={option.id}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            
                        >
                            {option.name.replace(/County|Parish/gi,"")}
                        </MenuItem>
                    ))}
                </Menu>
                </>
            }
            {loading &&
                <div className={classes.progressContainer}>
                    <CircularProgress size="1em" />
                    <p className={classes.progressText}>Loading</p>
                </div>
            }
            {fetchError &&
                <p>{fetchError}</p>
            }
        </>
    )
 };

export default SubstateSelect;
