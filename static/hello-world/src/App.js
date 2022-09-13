import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Data from './components/Data';

function App() {
	const [data, setData] = useState(null);
	const [pages, setPages] = useState(null);

	// useEffect(() => {
	// 	invoke('getText', { example: 'my-invoke-variable' }).then(setData);
	// }, []);

	useEffect(() => {
		invoke('getText', { example: 'my-invoke-variable' }).then((bro) => {
			console.log(bro);
			setData(JSON.stringify(bro));
		});
	}, []);

	return (
		<div>
			{data ? data : 'Loading...'}
			{/* {pages} */}
			{/* <Data/> */}
		</div>
	);
}

export default App;
