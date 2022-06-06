import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputParamsContext from './InputParamsContext';
import { months } from '../utilities/constants';

// This component was modified from the original to only allow month selection

const useStyles = makeStyles((theme) => ({
	menuitem: {
		paddingTop: "1px",
		paddingBottom: "1px",
	},
}));

const RenderDate = (props) => {
	const { dateLegend, dateParam, id } = props;
	const inputContext = useContext(InputParamsContext);
	const [, initMonth] = inputContext.inputParams[dateParam === 'date' ? 'edate' : dateParam].split("-");
	const [selectMonth, setSelectMonth] = useState(initMonth);
	const classes = useStyles();

	const updateDate = (newMonth) => {
		const newdate = ["1991", newMonth].join("-");
		if (dateParam === 'date') {
			inputContext.updateInputParams({sdate:newdate, edate:newdate});
		} else {
			inputContext.updateInputParams({[dateParam]:newdate});
		}
	};
	
	const handleChangeMonth = () => event => {
		const newMonth = event.target.value;
		setSelectMonth(newMonth);
		updateDate(newMonth);
	};

	const serialMonthOptions = () => {
		return (
			months.map((option,i) => {
				return (
					<MenuItem 
						key={"m"+i} 
						className={classes.menuitem}
						value={("0" + (i+1)).slice(-2)}
					>
						{option}
					</MenuItem>
				)
			})
		);
	};

	return (
		<>
  			<TextField
				select
				value={selectMonth}
				label={dateLegend}
				id={id}
				onChange={handleChangeMonth()}
				margin="dense"
				variant="outlined"
				SelectProps={{ native: false }}
				inputProps={{ "id":id }}
			>
				{serialMonthOptions()}
			</TextField>
		</>
	)
}
export default RenderDate;
