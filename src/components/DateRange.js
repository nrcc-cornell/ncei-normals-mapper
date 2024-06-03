import { useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import InputParamsContext from './InputParamsContext';
import { makeStyles } from '@mui/styles';
import { monthAbbs } from '../utilities/constants'

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid lightgray", 
    padding: "1em", 
    display: "inline-block",
  },
	dateSeperator: {
		lineHeight: "2em",
		margin: "0.25em 0.5em 0.25em",
	},
  menuitem: {
    minHeight: "auto",
    paddingTop: "1px",
	},
}));


export default function DateFilter(props) {
  const inputContext = useContext(InputParamsContext);
  const classes = useStyles();
  const [ smonth, setSmonth ] = useState('01');
  const [ emonth, setEmonth ] = useState('12');
  const [ sday, setSday ] = useState('01');
  const [ eday, setEday ] = useState('31');

  const updateDate = (whichdate, tmon, tday) => {
		const newdate = ["1991", tmon, tday].join("-");
    if (whichdate === "start") {
      inputContext.updateInputParams({sdate:newdate})
    } else {
      inputContext.updateInputParams({edate:newdate})
    }
	};

  const days_in_month = (month) => {
    // number of days in month (non-leap year)
    return dayjs('2023-' + month + '-01').daysInMonth()
  }

  const selectMonthOptions = (choices) => {
    return (
      choices.map(option => {
        return (
          <MenuItem 
            dense={true}
            className={classes.menuitem}
            sx={{ pt:0, pb:0 }}
            key={option.value} 
            value={option.value}
          >
            {option.label}
          </MenuItem>
        )
      })
    )
  }

  const selectDayOptions = (month) => {
    const dim = days_in_month(month)
    const dayChoices = Array.from({length: dim}, (v, k) => (k+1).toString().padStart(2, '0'))
    return (
      dayChoices.map(option => {
        return (
          <MenuItem 
            dense={true}
            className={classes.menuitem}
            sx={{ pt:0, pb:0 }}
            key={option} 
            value={option}
          >
            {option}
          </MenuItem>
        )
      })
    )
  }

  const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
    var dim_new_month, correctDay=null;
    switch(name) {
      case 'smonth':
        dim_new_month = days_in_month(value)
        if (parseInt(sday) > dim_new_month) {
          correctDay = dim_new_month.toString().padStart(2, '0')
          setSday(correctDay)
        }
        setSmonth(value);
        updateDate('start', value, correctDay || sday)
        break;
      case 'emonth':
        dim_new_month = days_in_month(value)
        if (parseInt(eday) > dim_new_month) {
          correctDay = dim_new_month.toString().padStart(2, '0')
          setEday(correctDay)
        }
        setEmonth(value);
        updateDate('end', value, correctDay || eday)
        break;
      case 'sday':
        setSday(value);
        updateDate('start', smonth, value)
        break;
      case 'eday':
        setEday(value);
        updateDate('end', emonth, value)
        break;
      default:
        console.log('Not month or day change')
    }
	}

  useEffect(() => {
		inputContext.updateInputParams({
      sdate:["1991", smonth, sday].join("-"), 
      edate:["1991", emonth, eday].join("-")
    });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


  return (
    <div className={classes.container}>
      <Stack direction="row" spacing={0}>
        <TextField size="small" sx={{ m:0 }}
            select
            name="smonth"
            value={smonth}
            onChange={handleChange}
        >
            {selectMonthOptions(monthAbbs)}
        </TextField>
        <TextField size="small" sx={{ m:0 }}
            select
            name="sday"
            value={sday}
            onChange={handleChange}
        >
            {selectDayOptions(smonth)}
        </TextField>

        <Typography className={classes.dateSeperator}>
						-
				</Typography>
        
        <TextField size="small" sx={{ m:0 }}
            select
            name="emonth"
            value={emonth}
            onChange={handleChange}
        >
            {selectMonthOptions(monthAbbs)}
        </TextField>
        <TextField size="small" sx={{ m:0 }}
            select
            name="eday"
            value={eday}
            onChange={handleChange}
        >
            {selectDayOptions(emonth)}
        </TextField>
      </Stack>
      </div>
  )
}
