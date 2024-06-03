import dayjs from 'dayjs';
import { elements, maxbbox } from '../utilities/constants';

//const dateDiff = (date1, date2) => {
//	const sdate = date1 instanceof Date ? date1 : new Date(date1);
//	const edate = date2 instanceof Date ? date2 : new Date(date2);
//	const one_day = 1000 * 60 * 60 * 24;
//	return (Math.round((edate.getTime() - sdate.getTime()) / one_day));
//};

// check bounding box 
const checkBbox = bbox => {
	const newbbox = [...bbox]
	if (bbox[0] < maxbbox.west) {
		newbbox[0] = maxbbox.west;
	}
	if (bbox[1] < maxbbox.south) {
		newbbox[1] = maxbbox.south;
	}
	if (bbox[2] > maxbbox.east) {
		newbbox[2] = maxbbox.east;
	}
	if (bbox[3] > maxbbox.north) {
		newbbox[3] = maxbbox.north;
	}
	return newbbox;
};

// check point 
const checkLoc = loc => {
	const newloc = [...loc]
	if (loc[0] < maxbbox.west) {
		newloc[0] = maxbbox.west;
	}
	if (loc[1] < maxbbox.south) {
		newloc[1] = maxbbox.south;
	}
	if (loc[0] > maxbbox.east) {
		newloc[0] = maxbbox.east;
	}
	if (loc[1] > maxbbox.north) {
		newloc[1] = maxbbox.north;
	}
	return newloc;
};

const buildParams = (input_params) => {
	var duration, newElems;
	let paramsToSubmit = {grid: input_params.grid, output: input_params.output};
	//console.log(input_params) // for debugging

	if (input_params.edate.length > 7) {
		// daily interval
		const date1 = dayjs(input_params.sdate);
		const date2 = dayjs(input_params.edate);
		const hrdiff = date2.diff(date1, 'hours');	//difference in hours
		const dydiff = Math.floor(hrdiff / 24);		// difference in days 
		duration = dydiff + (dydiff >= 0 ? 1 : 366)
		newElems = []
		if (input_params.elems[0].name !== 'all') {
			newElems.push({...input_params.elems[0], interval:[0,0,1], duration: duration})
		} else {
			['maxt','mint','avgt','pcpn'].forEach((elem,i) => {
				newElems.push({name: elem, interval: [0,0,1], duration: duration, reduce: elements[i].reduce});
			});
		}
	} else if (input_params.edate === input_params.sdate) {
		// single month duration is 1
		newElems = []
		if (input_params.elems[0].name !== 'all') {
			newElems.push({...input_params.elems[0], interval:[0,1], duration: 1})
		} else {
			['maxt','mint','avgt','pcpn'].forEach((elem,i) => {
				newElems.push({name: elem, interval: [0,1], duration: 1, reduce: elements[i].reduce});
			});
		}
	} else {
		// For "season" date selection, calculate duration based on sdate and edate. 
		const mndiff = parseInt(input_params.edate.split("-")[1]) - parseInt(input_params.sdate.split("-")[1]);
		duration = mndiff + (mndiff >= 0 ? 1 : 13);
		// Set up nested elements
		const origElem = input_params.elems[0];
		newElems = [
			{
				elem: origElem, 
				interval: [0,1], 
				duration: duration, 
				reduce: origElem.reduce
			}
		];
		// Replicate nested elems for all variables, if requested for a single grid point
		if (origElem.name === 'all') {
			let nestedElem = {...newElems[0].elem, name: 'maxt', reduce: elements[0].reduce};
			newElems[0] = {...newElems[0], elem:nestedElem, reduce: elements[0].reduce};
			['mint','avgt','pcpn'].forEach((elem,i) => {
				nestedElem = {...newElems[0].elem, name: elem, reduce: elements[i+1].reduce};
				newElems.push({...newElems[0], elem: nestedElem, reduce: elements[i+1].reduce});
			});
		}
	}

	// Add  elems as modified above to paramenters object
	paramsToSubmit = {...paramsToSubmit, elems: newElems}

	// send just date instead of sdate and edate.
	const newDate = paramsToSubmit.elems[0].interval.length === 2 ? input_params.edate.slice(0, 7) : input_params.edate;
	paramsToSubmit.date = newDate;

	// areaDef is type (state, loc, bbox) and value of area of interest.
	if (input_params.areaDef.bbox) {
		input_params.areaDef.bbox = input_params.areaDef.bbox.map(x => parseFloat(x))
		const newbbox = checkBbox(input_params.areaDef.bbox);
		paramsToSubmit = {...paramsToSubmit, bbox: newbbox};
		//console.log(input_params.areaDef.bbox)
	} else if (input_params.areaDef.loc) {
		input_params.areaDef.loc = input_params.areaDef.loc.map(x => parseFloat(x))
		const newloc = checkLoc(input_params.areaDef.loc);
		paramsToSubmit = {...paramsToSubmit, loc: newloc};
	} else if (input_params.areaDef.state) {
		paramsToSubmit = {...paramsToSubmit, ...input_params.areaDef};
	} else {
		console.log("unknown areaDef");
	}
	
	// point location can only be json
	if (paramsToSubmit.loc) {
		paramsToSubmit = {...paramsToSubmit, output: "json"};
	}

	// added image object if png output
	if (paramsToSubmit.output === 'png') {
		let newImage = {...input_params.image};
		// convert levels string (from Image Settings) to array
		if (input_params.image.levels && typeof input_params.image.levels === 'string') {
			const splitLevels = input_params.image.levels.split(",");
			const newLevels = splitLevels.map(x => parseFloat(x));
			newImage = {...newImage, levels: newLevels};
		}
		// leave off empty levels element
		if (input_params.image.hasOwnProperty('levels') && (input_params.image.levels === "" || input_params.image.levels.length === 0)) {
			delete newImage.levels;
			delete newImage.cmap;
		}
		if (input_params.image.hasOwnProperty('cmap') && input_params.image.cmap.length === 0) {
			delete newImage.cmap;
		}

		paramsToSubmit = {...paramsToSubmit, image: newImage};
	}

	return paramsToSubmit;	
};

// download a retrieved png image
const downloadFile = (href, filename) => {
	const link = document.createElement('a');
	link.href = href;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

// retrieve and download a geotiff or json file
const downloadFetch = (jsonparams, filename, output) => {
	if (output === 'json') {
		delete jsonparams.image;
	}
	const submitParams = JSON.stringify({...jsonparams, output:output, meta:"ll"});
	fetch("https://grid2.rcc-acis.org/GridData", {body: submitParams, method: "POST", headers: {'Content-Type': 'application/json'}})
		.then(response => {
			if (!response.ok) {
				console.log("Error fetching the results");
				return;
			}
			return output === 'json' ? response.json() : response.blob();
		})
		.then(response => {
			var blob;
			if (output === 'json') {
				const json = JSON.stringify(response);
  				blob = new Blob([json], {type:'application/json'});
			} else {
				blob = response;
			}
			const href = window.URL.createObjectURL(blob);
			downloadFile(href, filename)
		})
		.catch(err => {
			if (err.message.includes("Failed to execute 'createObjectURL' on 'URL'")) {
				console.log("Invalid grid request - "+jsonparams);
			} else {
				console.log(err.message);
			};
		});
};

export { buildParams, checkBbox, downloadFile, downloadFetch };