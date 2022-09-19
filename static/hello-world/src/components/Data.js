import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function Data() {
	const [pages, setPages] = useState(null);

	useEffect(() => {
		invoke('getPages').then((pagesJSON) => {
			console.log(pagesJSON);
			setPages(JSON.stringify(pagesJSON));
		});
	}, []);

	// return <div>{pages ? pages : 'Loading...'}</div>;
	return <div>
		<h1>Page data can be found in the console (Dev Tools)</h1>
	</div>
}

export default Data;
