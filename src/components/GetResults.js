import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { buildParams } from '../utilities/utils';
import DisplayMap from "./DisplayMap";
import DisplayJson from "./DisplayJson";

const GetResults = (props) => {
	const { inputParams, levels, updateLevels, updateColors, viewMap } = props;
	const [mapBlob, setMapBlob] = useState(false);
	const [jsonresp, setJsonresp] = useState(false);
	const [imgInfo, setImgInfo] = useState(false);
	const [resultsError, setResultsError] = useState();
	const [loading, setLoading] = useState(false);
	const [submittedParams, setSubmittedParams] = useState();

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
					setImgInfo(response);
					setJsonresp(false);
					setMapBlob(response.data);
				} else {
					setResultsError("");
					setMapBlob(false);
					setJsonresp(response.data);
					setImgInfo(false);
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
		if (viewMap) {
			setResultsError(null);
			setLoading(true);
			// Build parameters
			const input = buildParams(inputParams);
			// Save parameters 
			setSubmittedParams(input);
			if (input.output === 'png' && input.image.levels) {
				updateLevels({client: input.image.levels});
			} else {
				updateLevels({client: []});
			}
			// Get results
			fetchResponse(input, input.output);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [viewMap]);

	return (
		<>
			{viewMap &&
				<>
					{loading &&
						<CircularProgress />
					}
					{submittedParams && !loading && (jsonresp || mapBlob) &&
						<>
							{mapBlob &&
								<DisplayMap 
									imgsrc={mapBlob}
									imgInfo={imgInfo}
									submittedParams={submittedParams}
									inputParams={inputParams}
									levels={levels}
									updateLevels={updateLevels}
									updateColors={updateColors}
								/>
							}
							{jsonresp &&
								<DisplayJson
									jsonresp={jsonresp}
									submittedParams={submittedParams}
									inputParams={inputParams}
								/>
							}
						</>
					}
					{resultsError &&
						<p>{resultsError}</p>
					}
				</>
			}
		</>
	);
}

export default GetResults;