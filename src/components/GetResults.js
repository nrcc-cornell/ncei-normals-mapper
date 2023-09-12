import React, { useEffect, useState, useContext} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputParamsContext from './InputParamsContext';
import { buildParams } from '../utilities/utils';
import DisplayMap from "./DisplayMap";
import DisplayJson from "./DisplayJson";

const GetResults = () => {
	const [mapBlob, setMapBlob] = useState();
	const [jsonresp, setJsonresp] = useState();
	const [imgInfo, setImgInfo] = useState();
	const [resultsError, setResultsError] = useState();
	const [loading, setLoading] = useState(false);
	const [submittedParams, setSubmittedParams] = useState();
	const inputContext = useContext(InputParamsContext);

	const fetchResponse = (params, output) => {
		const infoInput = JSON.stringify({...params, output: "json"});
		fetch("https://grid2.rcc-acis.org/GridData", {body: infoInput, method: "POST", headers: {'Content-Type': 'application/json'},})
			.then(response => {
				if (!response.ok) {
					const message = "Error on request" + (response.statusText ? (": " + response.statusText) : "");
					setResultsError(message);
					return response.json();	// return to possibly get better message from json
				}
				return response.json();
			})
			.then(response => {
				if (response.error) {
					//setResultsError(response.status + " " + response.error)
					//always getting extraneous call returning status:"invalid request." and error:"unknown image return type: text/plain"
					//suppressing
					setResultsError("");
				} else if (output === 'png') {
					setResultsError("");
					setMapBlob(response.data);
					setImgInfo(response);
				} else {
					setResultsError("");
					setJsonresp(response.data);
				}
			})
			.catch(err => {
				if (err.message.includes("Failed to execute 'createObjectURL' on 'URL'")) {
					setResultsError("Invalid grid request - "+infoInput);
				} else {
					setResultsError("Error: " + err.message);
				};
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		setResultsError(null);
		setLoading(true);
		// Build parameters
		const input = buildParams(inputContext.inputParams);
		// Save parameters 
		setSubmittedParams(input);
		if (input.output === 'png' && input.image.levels) {
			inputContext.updateLevels({client: input.image.levels});
		} else {
			inputContext.updateLevels({client: []});
		}
		// Get results
		fetchResponse(input, input.output);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{loading &&
				<CircularProgress />
			}
			{submittedParams && (jsonresp || mapBlob) &&
				<>
					{mapBlob &&
						<DisplayMap 
							imgsrc={mapBlob}
							imgInfo={imgInfo}
							submittedParams={submittedParams}
						/>
					}
					{jsonresp &&
						<DisplayJson
							jsonresp={jsonresp}
							submittedParams={submittedParams}
						/>
					}
				</>
			}
			{resultsError &&
				<p>{resultsError}</p>
			}
		</>
	);
}

export default GetResults;