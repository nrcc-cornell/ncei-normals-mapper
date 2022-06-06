import React from "react";

const downloadFetch = (stringparams) => {
		const jsonparams = JSON.parse(stringparams);
		const submitParams = JSON.stringify({...jsonparams, output:"json"});
		console.log)(submitParams);
		fetch("https://grid2.rcc-acis.org/GridData", {body: submitParams, method: "POST"})
			.then(response => {
				if (!response.ok) {
					console.log("Error fetching the results");
					return;
				}
				return response.json();
			})
			.then(response => {
				const link = document.createElement('a');
				link.href = response;
				link.setAttribute('download', 'normalsData.json');
				document.body.appendChild(link);
				link.click();
			
			})
			.catch(err => {
				if (err.message.includes("Failed to execute 'createObjectURL' on 'URL'")) {
					console.log("Invalid grid request - "+jsonparams);
				} else {
					console.log(err.message);
				};
			});
};

export default downloadFetch;
