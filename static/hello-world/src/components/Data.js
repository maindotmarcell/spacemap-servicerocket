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

	return <div>{pages ? pages : 'Loading...'}</div>;
}

export default Data;
